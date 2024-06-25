// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true, mode: "string" }),
  },
  (userIdx) => ({
    idIndex: index("users_id_idx").on(userIdx.id),
    nameIndex: index("users_name_idx").on(userIdx.name),
    emailIndex: index("users_email_idx").on(userIdx.email),
  }),
);

export const session = createTable(
  "sessions",
  {
    id: text("id").primaryKey().notNull(),
    userId: text("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updated_at: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
  },
  (table) => {
    return {
      id_idx: index("session_id_idx").on(table.id),
      user_id_idx: index("session_user_id_idx").on(table.userId),
    };
  },
);

export const projects = createTable(
  "projects",
  {
    id: text("id").primaryKey().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description"),
    tech: text("tech").array().notNull(),
    image_url: text("image_url"),
    github_url: text("github_url"),
    url: text("url"),
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updated_at: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
  },
  (projectsIdx) => ({
    projectId: index("project_id_idx").on(projectsIdx.id),
    nameIndex: index("project_name_idx").on(projectsIdx.name),
  }),
);

export const projectViews = createTable(
  "project_views",
  {
    id: text("id").primaryKey().notNull(),
    count: integer("count").notNull(),
    project_id: text("project_id")
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
  },
  (projectViewsIdx) => ({
    projectViewId: index("project_view_id_idx").on(projectViewsIdx.id),
  }),
);

export const projectRelations = relations(projects, ({ one }) => ({
  projectView: one(projectViews, {
    fields: [projects.id],
    references: [projectViews.project_id],
  }),
}));

export const experiences = createTable(
  "experiences",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description"),
    type: text("type").notNull(),
    company: text("company").notNull(),
    date: text("date").notNull(),
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updated_at: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
  },
  (experiencesIdx) => ({
    experienceId: index("experience_id_idx").on(experiencesIdx.id),
    nameIndex: index("expereience_name_idx").on(experiencesIdx.name),
  }),
);

export const pageViews = createTable(
  "page_views",
  {
    id: text("id").primaryKey().notNull(),
    count: integer("count").notNull(),
    title: text("title").notNull(),
  },
  (pageViewsIdx) => ({
    pageViewId: index("page_view_id_idx").on(pageViewsIdx.id),
  }),
);
