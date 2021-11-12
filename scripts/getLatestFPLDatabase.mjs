#!/usr/bin/env ./node_modules/.bin/zx
import 'zx/globals'

import task from 'tasuku'

await task('setup git', async () => {
  await $`ssh-keyscan github.com >> ~/.ssh/known_hosts`
})

await task('git clone - vaastav/Fantasy-Premier-League', async () => {
  await $`rm -rf fpl.db`
  await $`rm -rf Fantasy-Premier-League`
  await $`git clone https://github.com/vaastav/Fantasy-Premier-League.git`
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
.import Fantasy-Premier-League/data/2021-22/cleaned_players.csv players
delete from players where total_points='total_points';
EOF`
})

await task('sqlite - change lastUpdated and move db when it has changed', async () => {
  const r = await $`sqldiff fpl.db public/static/fpl.db`
  if (r.stdout.trim() === '') {
    // No not changed
  } else {
    // DB Changed
    await $`sqlite3 fpl.db << EOF
CREATE TABLE meta(
  lastUpdated TEXT
);
INSERT INTO meta (lastUpdated) VALUES (CURRENT_TIMESTAMP)
EOF`
  }
  await $`mv fpl.db public/static/fpl.db`
})