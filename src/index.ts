import { Client } from "@notionhq/client";
import { QueryAdapter } from "./adapter/query-adapter";
import "dotenv/config";

function main() {
	const databaseId = process.env.NOTION_DATABASE_ID ?? "";
	const notion = new QueryAdapter(new Client({ auth: process.env.NOTION_KEY }));
	notion
		.queryDatabase(databaseId)
		.then((result) => {
			console.log(JSON.stringify(result));
		})
		.catch((err) => {
			console.log(JSON.stringify(err));
		});
}

main();
