import { Client } from "@notionhq/client";
import { QueryAdapter } from "./adapter/query-adapter";
import "dotenv/config";
import { Command } from "commander";

const app = new Command();
function query(databaseId?: string) {
	const dbId = databaseId ?? process.env.NOTION_DATABASE_ID ?? "";
	const notion = new QueryAdapter(new Client({ auth: process.env.NOTION_KEY }));
	notion
		.queryDatabase(dbId)
		.then((result) => {
			console.log(JSON.stringify(result));
		})
		.catch((err) => {
			console.log(JSON.stringify(err));
		});
}

function retrievePage(pageId: string) {
	const notion = new QueryAdapter(new Client({ auth: process.env.NOTION_KEY }));
	notion
		.retrievePage(pageId)
		.then((result) => {
			console.log(JSON.stringify(result));
		})
		.catch((err) => {
			console.log(JSON.stringify(err));
		});
}

function listBlocks(pageId: string) {
	const notion = new QueryAdapter(new Client({ auth: process.env.NOTION_KEY }));
	notion
		.listBlocks(pageId)
		.then((result) => {
			console.log(JSON.stringify(result));
		})
		.catch((err) => {
			console.log(JSON.stringify(err));
		});
}

app
	.command("query")
	.argument("[databaseId]", "notion database id")
	.action(async (databaseId) => {
		query(databaseId);
	});

app
	.command("page")
	.argument("[pageId]", "notion page id")
	.action(async (pageId) => {
		retrievePage(pageId);
	});

app
	.command("child")
	.argument("[pageId]", "notion page id")
	.action(async (pageId) => {
		listBlocks(pageId);
	});

app.parse(process.argv);
