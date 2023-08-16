#!/usr/bin/env ./node_modules/.bin/zx
import 'zx/globals'

import task from 'tasuku'

import arg from 'arg'

const args = arg({
  '--clone': Boolean
})
const clone = args['--clone'] || false

await task('setup git', async () => {
  await $`mkdir -p ~/.ssh`
  await $`touch ~/.ssh/known_hosts`
  await $`ssh-keyscan github.com >> ~/.ssh/known_hosts`
})

await task('git clone - vaastav/Fantasy-Premier-League', async () => {
  await $`rm -rf fpl.db`
  if (clone) {
    await $`rm -rf Fantasy-Premier-League`
    await $`git clone https://github.com/vaastav/Fantasy-Premier-League.git`
  }
})

await task('log git clone - vaastav/Fantasy-Premier-League', async () => {
  await $`head -n 5 Fantasy-Premier-League/data/2023-24/cleaned_players.csv`
})

await task('sqlite - import csv data', async () => {
  await $`sqlite3 fpl.db << EOF
.mode csv
CREATE TABLE players(
  "first_name" TEXT,
  "second_name" TEXT,
  "goals_scored" INTEGER,
  "assists" INTEGER,
  "total_points" INTEGER,
  "minutes" INTEGER,
  "goals_conceded" INTEGER,
  "creativity" FLOAT,
  "influence" FLOAT,
  "threat" FLOAT,
  "bonus" INTEGER,
  "bps" TEXT,
  "ict_index" FLOAT,
  "clean_sheets" INTEGER,
  "red_cards" INTEGER,
  "yellow_cards" INTEGER,
  "selected_by_percent" FLOAT,
  "now_cost" INTEGER,
  "element_type" TEXT
);
.import Fantasy-Premier-League/data/2023-24/cleaned_players.csv players
delete from players where total_points='total_points';
EOF`
})

await task('sqlite - change lastUpdated and move db when it has changed', async () => {
  // DROP meta, compare only players
  await $`sqlite3 public/static/fpl.db << EOF
DROP TABLE meta;
EOF`
  const r = await $`sqldiff fpl.db public/static/fpl.db`
  if (r.stdout.trim() === '') {
    // No not changed
    console.log('DB has not changed, revert the DROP meta change')
    await $`git checkout public/static/fpl.db`
  } else {
    // DB Changed
    console.log('DB has changed, adding timestamp and moving the file')
    await $`sqlite3 fpl.db << EOF
  CREATE TABLE meta(
    lastUpdated TEXT
  );
  INSERT INTO meta (lastUpdated) VALUES (CURRENT_TIMESTAMP)
EOF`
    await $`mv fpl.db public/static/fpl.db`
  }
})
