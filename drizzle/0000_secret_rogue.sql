CREATE TYPE "public"."account_status" AS ENUM('active', 'disabled');--> statement-breakpoint
CREATE TYPE "public"."argument_function" AS ENUM('evidence', 'argument', 'counterargument', 'answer', 'definition', 'exegesis', 'historical_background', 'application', 'open_question', 'conclusion');--> statement-breakpoint
CREATE TYPE "public"."connection_type" AS ENUM('supports', 'contradicts', 'nuances', 'defines', 'explains', 'applies', 'exemplifies', 'appeals_to', 'exegetes', 'historically_influenced_by', 'corresponds_with', 'apparently_conflicts_with', 'answers', 'raises_question');--> statement-breakpoint
CREATE TYPE "public"."intended_output" AS ENUM('article', 'essay', 'lecture', 'sermon_study', 'thesis', 'research_document', 'other');--> statement-breakpoint
CREATE TYPE "public"."record_status" AS ENUM('active', 'archived');--> statement-breakpoint
CREATE TYPE "public"."study_item_type" AS ENUM('note', 'quote', 'summary', 'statement', 'argument', 'counterargument', 'definition', 'exegetical_observation', 'historical_context', 'open_question');--> statement-breakpoint
CREATE TABLE "bible_references" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"study_item_id" uuid NOT NULL,
	"book" text NOT NULL,
	"chapter" integer NOT NULL,
	"verse_from" integer,
	"verse_to" integer,
	"translation" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bible_references_chapter_positive" CHECK ("bible_references"."chapter" > 0),
	CONSTRAINT "bible_references_verse_from_positive" CHECK ("bible_references"."verse_from" is null or "bible_references"."verse_from" > 0),
	CONSTRAINT "bible_references_verse_to_valid" CHECK ("bible_references"."verse_to" is null or ("bible_references"."verse_to" > 0 and ("bible_references"."verse_from" is null or "bible_references"."verse_to" >= "bible_references"."verse_from")))
);
--> statement-breakpoint
CREATE TABLE "connections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dossier_id" uuid NOT NULL,
	"source_item_id" uuid NOT NULL,
	"target_item_id" uuid NOT NULL,
	"type" "connection_type" NOT NULL,
	"explanation" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "connections_distinct_items" CHECK ("connections"."source_item_id" <> "connections"."target_item_id")
);
--> statement-breakpoint
CREATE TABLE "research_dossiers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"central_question" text NOT NULL,
	"description" text,
	"intended_output" "intended_output",
	"status" "record_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "research_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dossier_id" uuid NOT NULL,
	"theme_id" uuid,
	"question" text NOT NULL,
	"notes" text,
	"position" integer DEFAULT 0 NOT NULL,
	"status" "record_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "research_questions_position_non_negative" CHECK ("research_questions"."position" >= 0)
);
--> statement-breakpoint
CREATE TABLE "source_references" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"study_item_id" uuid NOT NULL,
	"source_id" uuid NOT NULL,
	"chapter" text,
	"page_from" text,
	"page_to" text,
	"url" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"author" text NOT NULL,
	"title" text NOT NULL,
	"publication_year" integer,
	"edition" text,
	"publisher" text,
	"volume" text,
	"bibliographic_details" text,
	"status" "record_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sources_publication_year_valid" CHECK ("sources"."publication_year" is null or "sources"."publication_year" between 1 and 9999)
);
--> statement-breakpoint
CREATE TABLE "study_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dossier_id" uuid NOT NULL,
	"theme_id" uuid,
	"question_id" uuid,
	"type" "study_item_type" NOT NULL,
	"title" text,
	"content" text NOT NULL,
	"personal_notes" text,
	"argument_function" "argument_function",
	"status" "record_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "themes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dossier_id" uuid NOT NULL,
	"parent_theme_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"position" integer DEFAULT 0 NOT NULL,
	"status" "record_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "themes_position_non_negative" CHECK ("themes"."position" >= 0)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"status" "account_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "writing_section_items" (
	"dossier_id" uuid NOT NULL,
	"writing_section_id" uuid NOT NULL,
	"study_item_id" uuid NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"writing_instruction" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "writing_section_items_writing_section_id_study_item_id_pk" PRIMARY KEY("writing_section_id","study_item_id"),
	CONSTRAINT "writing_section_items_position_non_negative" CHECK ("writing_section_items"."position" >= 0)
);
--> statement-breakpoint
CREATE TABLE "writing_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dossier_id" uuid NOT NULL,
	"parent_section_id" uuid,
	"title" text NOT NULL,
	"description" text,
	"position" integer DEFAULT 0 NOT NULL,
	"status" "record_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "writing_sections_position_non_negative" CHECK ("writing_sections"."position" >= 0)
);
--> statement-breakpoint
ALTER TABLE "bible_references" ADD CONSTRAINT "bible_references_study_item_id_study_items_id_fk" FOREIGN KEY ("study_item_id") REFERENCES "public"."study_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_dossier_id_research_dossiers_id_fk" FOREIGN KEY ("dossier_id") REFERENCES "public"."research_dossiers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_source_same_dossier_fk" FOREIGN KEY ("source_item_id","dossier_id") REFERENCES "public"."study_items"("id","dossier_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_target_same_dossier_fk" FOREIGN KEY ("target_item_id","dossier_id") REFERENCES "public"."study_items"("id","dossier_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "research_dossiers" ADD CONSTRAINT "research_dossiers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "research_questions" ADD CONSTRAINT "research_questions_dossier_id_research_dossiers_id_fk" FOREIGN KEY ("dossier_id") REFERENCES "public"."research_dossiers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "research_questions" ADD CONSTRAINT "research_questions_theme_same_dossier_fk" FOREIGN KEY ("theme_id","dossier_id") REFERENCES "public"."themes"("id","dossier_id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_references" ADD CONSTRAINT "source_references_study_item_id_study_items_id_fk" FOREIGN KEY ("study_item_id") REFERENCES "public"."study_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_references" ADD CONSTRAINT "source_references_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sources" ADD CONSTRAINT "sources_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "study_items" ADD CONSTRAINT "study_items_dossier_id_research_dossiers_id_fk" FOREIGN KEY ("dossier_id") REFERENCES "public"."research_dossiers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "study_items" ADD CONSTRAINT "study_items_theme_same_dossier_fk" FOREIGN KEY ("theme_id","dossier_id") REFERENCES "public"."themes"("id","dossier_id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "study_items" ADD CONSTRAINT "study_items_question_same_dossier_fk" FOREIGN KEY ("question_id","dossier_id") REFERENCES "public"."research_questions"("id","dossier_id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "themes" ADD CONSTRAINT "themes_dossier_id_research_dossiers_id_fk" FOREIGN KEY ("dossier_id") REFERENCES "public"."research_dossiers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "themes" ADD CONSTRAINT "themes_parent_theme_id_themes_id_fk" FOREIGN KEY ("parent_theme_id") REFERENCES "public"."themes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing_section_items" ADD CONSTRAINT "writing_section_items_dossier_id_research_dossiers_id_fk" FOREIGN KEY ("dossier_id") REFERENCES "public"."research_dossiers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing_section_items" ADD CONSTRAINT "writing_section_items_section_same_dossier_fk" FOREIGN KEY ("writing_section_id","dossier_id") REFERENCES "public"."writing_sections"("id","dossier_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing_section_items" ADD CONSTRAINT "writing_section_items_item_same_dossier_fk" FOREIGN KEY ("study_item_id","dossier_id") REFERENCES "public"."study_items"("id","dossier_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing_sections" ADD CONSTRAINT "writing_sections_dossier_id_research_dossiers_id_fk" FOREIGN KEY ("dossier_id") REFERENCES "public"."research_dossiers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing_sections" ADD CONSTRAINT "writing_sections_parent_section_id_writing_sections_id_fk" FOREIGN KEY ("parent_section_id") REFERENCES "public"."writing_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bible_references_item_idx" ON "bible_references" USING btree ("study_item_id");--> statement-breakpoint
CREATE INDEX "bible_references_book_idx" ON "bible_references" USING btree ("book");--> statement-breakpoint
CREATE INDEX "connections_source_idx" ON "connections" USING btree ("source_item_id");--> statement-breakpoint
CREATE INDEX "connections_target_idx" ON "connections" USING btree ("target_item_id");--> statement-breakpoint
CREATE INDEX "connections_dossier_idx" ON "connections" USING btree ("dossier_id");--> statement-breakpoint
CREATE UNIQUE INDEX "connections_unique" ON "connections" USING btree ("source_item_id","target_item_id","type");--> statement-breakpoint
CREATE INDEX "research_dossiers_user_idx" ON "research_dossiers" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "research_dossiers_user_status_idx" ON "research_dossiers" USING btree ("user_id","status");--> statement-breakpoint
CREATE INDEX "research_questions_dossier_idx" ON "research_questions" USING btree ("dossier_id");--> statement-breakpoint
CREATE INDEX "research_questions_theme_idx" ON "research_questions" USING btree ("theme_id");--> statement-breakpoint
CREATE UNIQUE INDEX "research_questions_id_dossier_unique" ON "research_questions" USING btree ("id","dossier_id");--> statement-breakpoint
CREATE INDEX "source_references_item_idx" ON "source_references" USING btree ("study_item_id");--> statement-breakpoint
CREATE INDEX "source_references_source_idx" ON "source_references" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "sources_user_idx" ON "sources" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sources_author_idx" ON "sources" USING btree ("author");--> statement-breakpoint
CREATE INDEX "study_items_dossier_idx" ON "study_items" USING btree ("dossier_id");--> statement-breakpoint
CREATE INDEX "study_items_theme_idx" ON "study_items" USING btree ("theme_id");--> statement-breakpoint
CREATE INDEX "study_items_question_idx" ON "study_items" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX "study_items_type_idx" ON "study_items" USING btree ("type");--> statement-breakpoint
CREATE INDEX "study_items_argument_function_idx" ON "study_items" USING btree ("argument_function");--> statement-breakpoint
CREATE UNIQUE INDEX "study_items_id_dossier_unique" ON "study_items" USING btree ("id","dossier_id");--> statement-breakpoint
CREATE INDEX "themes_dossier_idx" ON "themes" USING btree ("dossier_id");--> statement-breakpoint
CREATE INDEX "themes_parent_idx" ON "themes" USING btree ("parent_theme_id");--> statement-breakpoint
CREATE UNIQUE INDEX "themes_id_dossier_unique" ON "themes" USING btree ("id","dossier_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "writing_section_items_dossier_idx" ON "writing_section_items" USING btree ("dossier_id");--> statement-breakpoint
CREATE INDEX "writing_section_items_item_idx" ON "writing_section_items" USING btree ("study_item_id");--> statement-breakpoint
CREATE INDEX "writing_sections_dossier_idx" ON "writing_sections" USING btree ("dossier_id");--> statement-breakpoint
CREATE INDEX "writing_sections_parent_idx" ON "writing_sections" USING btree ("parent_section_id");--> statement-breakpoint
CREATE UNIQUE INDEX "writing_sections_id_dossier_unique" ON "writing_sections" USING btree ("id","dossier_id");