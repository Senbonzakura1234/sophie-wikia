import type { ImprovedOmit } from '../../../../types/common';
import type { GithubUserInfo, ModuleIdEnum, RelatedCategoryEnum, SearchQuery } from '../../../../types/common/zod';
import { categoryList, colorList, recipeTypeList, relatedCategoryList, rumorTypeList } from '../../../../types/model';
import type { InferSelectModel } from 'drizzle-orm';
import { jsonb, pgTableCreator, smallint, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { appEnv } from '../../../utils/env.mjs';

export type HighlightText = { content: string };
export type HyperLinkRecord = { id: string; name: string; table: ModuleIdEnum };
export type HyperLinkSearch = { searchQuery: SearchQuery; table: ModuleIdEnum };

export type ItemDescription = {
	hunt: Array<string>;
	location: Array<string>;
	rumor: HyperLinkRecord | null;
	special: string | null;
	shop: string | null;
};

export type RelatedCategory = { count: number; name: RelatedCategoryEnum };

export type HyperLinkMap = {
	contentData: Array<HighlightText | HyperLinkRecord | HyperLinkSearch>;
	contentText: Array<string>;
};

export const pgTable = pgTableCreator(name => `sophie_dex_${name}`);

export const effects = pgTable('effects', {
	id: uuid('id').primaryKey(),
	keyWords: varchar('key_words', { length: 256 }).notNull(),
	name: varchar('name', { length: 256 }).notNull(),

	index: smallint('index').notNull(),
	description: varchar('description', { length: 256 }).notNull(),
});

export const items = pgTable('items', {
	id: uuid('id').primaryKey(),
	keyWords: varchar('key_words', { length: 256 }).notNull(),
	name: varchar('name', { length: 256 }).notNull(),

	category: varchar('category', { enum: categoryList, length: 100 }).notNull(),
	color: varchar('color', { enum: colorList, length: 100 }).notNull(),
	description: jsonb('description').$type<ItemDescription>().notNull(),
	index: smallint('index').notNull(),
	level: smallint('level').notNull(),
	recipeIdea: jsonb('recipe_idea').$type<HyperLinkMap>(),
	recipeType: varchar('recipe_type', { enum: recipeTypeList, length: 100 }),
	relatedCategories: varchar('related_categories', { enum: relatedCategoryList, length: 100 }).array().notNull(),
	traitPresent: jsonb('trait_present').$type<HyperLinkRecord>(),
});

export const rumors = pgTable('rumors', {
	id: uuid('id').primaryKey(),
	keyWords: varchar('key_words', { length: 256 }).notNull(),
	name: varchar('name', { length: 256 }).notNull(),

	description: jsonb('description').$type<HyperLinkMap>().notNull(),
	location: varchar('location', { length: 256 }).notNull(),
	price: smallint('price').notNull(),
	rumorType: varchar('rumor_type', { enum: rumorTypeList, length: 100 }).notNull(),
});

export const traits = pgTable('traits', {
	id: uuid('id').primaryKey(),
	keyWords: varchar('key_words', { length: 256 }).notNull(),
	name: varchar('name', { length: 256 }).notNull(),

	categories: varchar('categories', { enum: categoryList, length: 100 }).array().notNull(),
	description: varchar('description', { length: 256 }).notNull(),
	index: smallint('index').notNull(),
	itemPresent: jsonb('item_present').$type<HyperLinkRecord>(),
	mergeFrom: jsonb('merge_from').$type<Array<[HyperLinkRecord, HyperLinkRecord]>>().notNull(),
});

export const users = pgTable('users', {
	id: uuid('id').primaryKey(),
	username: varchar('username', { length: 256 }).notNull().unique(),
	email: varchar('email', { length: 256 }).notNull(),
	githubProfile: jsonb('github_profile').$type<GithubUserInfo>().notNull(),

	createdAt: timestamp('created_at', { precision: 6, withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true, mode: 'string' }),
});

export type Effect = InferSelectModel<typeof effects>;
export type Item = InferSelectModel<typeof items>;
export type Rumor = InferSelectModel<typeof rumors>;
export type Trait = InferSelectModel<typeof traits>;
export type User = InferSelectModel<typeof users>;

export type CommonRecord = ImprovedOmit<Effect | Item | Rumor | Trait, 'description'>;
