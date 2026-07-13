import { sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  check,
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const accountStatus = pgEnum("account_status", ["active", "disabled"]);
export const recordStatus = pgEnum("record_status", ["active", "archived"]);
export const intendedOutput = pgEnum("intended_output", [
  "article",
  "essay",
  "lecture",
  "sermon_study",
  "thesis",
  "research_document",
  "other",
]);
export const studyItemType = pgEnum("study_item_type", [
  "note",
  "quote",
  "summary",
  "statement",
  "argument",
  "counterargument",
  "definition",
  "exegetical_observation",
  "historical_context",
  "open_question",
]);
export const argumentFunction = pgEnum("argument_function", [
  "evidence",
  "argument",
  "counterargument",
  "answer",
  "definition",
  "exegesis",
  "historical_background",
  "application",
  "open_question",
  "conclusion",
]);
export const connectionType = pgEnum("connection_type", [
  "supports",
  "contradicts",
  "nuances",
  "defines",
  "explains",
  "applies",
  "exemplifies",
  "appeals_to",
  "exegetes",
  "historically_influenced_by",
  "corresponds_with",
  "apparently_conflicts_with",
  "answers",
  "raises_question",
]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    status: accountStatus("status").default("active").notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)],
);

export const researchDossiers = pgTable(
  "research_dossiers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    centralQuestion: text("central_question").notNull(),
    description: text("description"),
    intendedOutput: intendedOutput("intended_output"),
    status: recordStatus("status").default("active").notNull(),
    ...timestamps,
  },
  (table) => [
    index("research_dossiers_user_idx").on(table.userId),
    index("research_dossiers_user_status_idx").on(table.userId, table.status),
  ],
);

export const themes = pgTable(
  "themes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dossierId: uuid("dossier_id")
      .notNull()
      .references(() => researchDossiers.id, { onDelete: "cascade" }),
    parentThemeId: uuid("parent_theme_id").references(
      (): AnyPgColumn => themes.id,
      { onDelete: "cascade" },
    ),
    name: text("name").notNull(),
    description: text("description"),
    position: integer("position").default(0).notNull(),
    status: recordStatus("status").default("active").notNull(),
    ...timestamps,
  },
  (table) => [
    index("themes_dossier_idx").on(table.dossierId),
    index("themes_parent_idx").on(table.parentThemeId),
    uniqueIndex("themes_id_dossier_unique").on(table.id, table.dossierId),
    check("themes_position_non_negative", sql`${table.position} >= 0`),
  ],
);

export const researchQuestions = pgTable(
  "research_questions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dossierId: uuid("dossier_id")
      .notNull()
      .references(() => researchDossiers.id, { onDelete: "cascade" }),
    themeId: uuid("theme_id"),
    question: text("question").notNull(),
    notes: text("notes"),
    position: integer("position").default(0).notNull(),
    status: recordStatus("status").default("active").notNull(),
    ...timestamps,
  },
  (table) => [
    index("research_questions_dossier_idx").on(table.dossierId),
    index("research_questions_theme_idx").on(table.themeId),
    uniqueIndex("research_questions_id_dossier_unique").on(table.id, table.dossierId),
    foreignKey({
      columns: [table.themeId, table.dossierId],
      foreignColumns: [themes.id, themes.dossierId],
      name: "research_questions_theme_same_dossier_fk",
    }).onDelete("restrict"),
    check("research_questions_position_non_negative", sql`${table.position} >= 0`),
  ],
);

export const studyItems = pgTable(
  "study_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dossierId: uuid("dossier_id")
      .notNull()
      .references(() => researchDossiers.id, { onDelete: "cascade" }),
    themeId: uuid("theme_id"),
    questionId: uuid("question_id"),
    type: studyItemType("type").notNull(),
    title: text("title"),
    content: text("content").notNull(),
    personalNotes: text("personal_notes"),
    argumentFunction: argumentFunction("argument_function"),
    status: recordStatus("status").default("active").notNull(),
    ...timestamps,
  },
  (table) => [
    index("study_items_dossier_idx").on(table.dossierId),
    index("study_items_theme_idx").on(table.themeId),
    index("study_items_question_idx").on(table.questionId),
    index("study_items_type_idx").on(table.type),
    index("study_items_argument_function_idx").on(table.argumentFunction),
    uniqueIndex("study_items_id_dossier_unique").on(table.id, table.dossierId),
    foreignKey({
      columns: [table.themeId, table.dossierId],
      foreignColumns: [themes.id, themes.dossierId],
      name: "study_items_theme_same_dossier_fk",
    }).onDelete("restrict"),
    foreignKey({
      columns: [table.questionId, table.dossierId],
      foreignColumns: [researchQuestions.id, researchQuestions.dossierId],
      name: "study_items_question_same_dossier_fk",
    }).onDelete("restrict"),
  ],
);

export const sources = pgTable(
  "sources",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    author: text("author").notNull(),
    title: text("title").notNull(),
    publicationYear: integer("publication_year"),
    edition: text("edition"),
    publisher: text("publisher"),
    volume: text("volume"),
    bibliographicDetails: text("bibliographic_details"),
    status: recordStatus("status").default("active").notNull(),
    ...timestamps,
  },
  (table) => [
    index("sources_user_idx").on(table.userId),
    index("sources_author_idx").on(table.author),
    check(
      "sources_publication_year_valid",
      sql`${table.publicationYear} is null or ${table.publicationYear} between 1 and 9999`,
    ),
  ],
);

export const sourceReferences = pgTable(
  "source_references",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    studyItemId: uuid("study_item_id")
      .notNull()
      .references(() => studyItems.id, { onDelete: "cascade" }),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => sources.id, { onDelete: "restrict" }),
    chapter: text("chapter"),
    pageFrom: text("page_from"),
    pageTo: text("page_to"),
    url: text("url"),
    notes: text("notes"),
    ...timestamps,
  },
  (table) => [
    index("source_references_item_idx").on(table.studyItemId),
    index("source_references_source_idx").on(table.sourceId),
  ],
);

export const bibleReferences = pgTable(
  "bible_references",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    studyItemId: uuid("study_item_id")
      .notNull()
      .references(() => studyItems.id, { onDelete: "cascade" }),
    book: text("book").notNull(),
    chapter: integer("chapter").notNull(),
    verseFrom: integer("verse_from"),
    verseTo: integer("verse_to"),
    translation: text("translation"),
    notes: text("notes"),
    ...timestamps,
  },
  (table) => [
    index("bible_references_item_idx").on(table.studyItemId),
    index("bible_references_book_idx").on(table.book),
    check("bible_references_chapter_positive", sql`${table.chapter} > 0`),
    check(
      "bible_references_verse_from_positive",
      sql`${table.verseFrom} is null or ${table.verseFrom} > 0`,
    ),
    check(
      "bible_references_verse_to_valid",
      sql`${table.verseTo} is null or (${table.verseTo} > 0 and (${table.verseFrom} is null or ${table.verseTo} >= ${table.verseFrom}))`,
    ),
  ],
);

export const connections = pgTable(
  "connections",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dossierId: uuid("dossier_id")
      .notNull()
      .references(() => researchDossiers.id, { onDelete: "cascade" }),
    sourceItemId: uuid("source_item_id").notNull(),
    targetItemId: uuid("target_item_id").notNull(),
    type: connectionType("type").notNull(),
    explanation: text("explanation"),
    ...timestamps,
  },
  (table) => [
    index("connections_source_idx").on(table.sourceItemId),
    index("connections_target_idx").on(table.targetItemId),
    index("connections_dossier_idx").on(table.dossierId),
    uniqueIndex("connections_unique").on(
      table.sourceItemId,
      table.targetItemId,
      table.type,
    ),
    check("connections_distinct_items", sql`${table.sourceItemId} <> ${table.targetItemId}`),
    foreignKey({
      columns: [table.sourceItemId, table.dossierId],
      foreignColumns: [studyItems.id, studyItems.dossierId],
      name: "connections_source_same_dossier_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.targetItemId, table.dossierId],
      foreignColumns: [studyItems.id, studyItems.dossierId],
      name: "connections_target_same_dossier_fk",
    }).onDelete("cascade"),
  ],
);

export const writingSections = pgTable(
  "writing_sections",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dossierId: uuid("dossier_id")
      .notNull()
      .references(() => researchDossiers.id, { onDelete: "cascade" }),
    parentSectionId: uuid("parent_section_id").references(
      (): AnyPgColumn => writingSections.id,
      { onDelete: "cascade" },
    ),
    title: text("title").notNull(),
    description: text("description"),
    position: integer("position").default(0).notNull(),
    status: recordStatus("status").default("active").notNull(),
    ...timestamps,
  },
  (table) => [
    index("writing_sections_dossier_idx").on(table.dossierId),
    index("writing_sections_parent_idx").on(table.parentSectionId),
    uniqueIndex("writing_sections_id_dossier_unique").on(table.id, table.dossierId),
    check("writing_sections_position_non_negative", sql`${table.position} >= 0`),
  ],
);

export const writingSectionItems = pgTable(
  "writing_section_items",
  {
    dossierId: uuid("dossier_id")
      .notNull()
      .references(() => researchDossiers.id, { onDelete: "cascade" }),
    writingSectionId: uuid("writing_section_id").notNull(),
    studyItemId: uuid("study_item_id").notNull(),
    position: integer("position").default(0).notNull(),
    writingInstruction: text("writing_instruction"),
    ...timestamps,
  },
  (table) => [
    primaryKey({ columns: [table.writingSectionId, table.studyItemId] }),
    index("writing_section_items_dossier_idx").on(table.dossierId),
    index("writing_section_items_item_idx").on(table.studyItemId),
    foreignKey({
      columns: [table.writingSectionId, table.dossierId],
      foreignColumns: [writingSections.id, writingSections.dossierId],
      name: "writing_section_items_section_same_dossier_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.studyItemId, table.dossierId],
      foreignColumns: [studyItems.id, studyItems.dossierId],
      name: "writing_section_items_item_same_dossier_fk",
    }).onDelete("cascade"),
    check("writing_section_items_position_non_negative", sql`${table.position} >= 0`),
  ],
);
