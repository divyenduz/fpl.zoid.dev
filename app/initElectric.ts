import { ElectricDatabase, electrify } from "electric-sql/browser"
import { schema } from "src/generated/client"

const config = {
    // TODO(electric): make this configurable
    url: 'http://localhost:5133',
    debug: true,
}

export async function initElectric() {
    const conn = await ElectricDatabase.init('fpl.zoid.dev')
    const electric = await electrify(conn, schema, config)
    /**
     * TODO(electric): implement proper authentication, 
     * doesn't matter for this PR as there is no backend right now 
     * in production and the UI is progressive.
     */
    await electric.connect('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTcxNDE0MTI2NCwiZXhwIjoxODE0MTQ0ODY0fQ.hWCagfn6D_uRKJRldciJQvPCB94JqLXTG6LTfwdyEJw')
    const db = electric.db
    return { electric, db }
}