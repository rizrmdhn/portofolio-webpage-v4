// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
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
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
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
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" }),
    updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" }),
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
    name: varchar("name", { length: 256 }),
    description: text("description"),
    tech: text("tech").array().notNull(),
    imageUrl: text("image_url"),
    githubUrl: text("github_url"),
    url: text("url"),
    created_at: timestamp("created_at", { withTimezone: true }),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (projectsIdx) => ({
    projectId: index("project_id_idx").on(projectsIdx.id),
    nameIndex: index("project_name_idx").on(projectsIdx.name),
  }),
);

export const experiences = createTable(
  "experiences",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description"),
    type: text("type").notNull(),
    company: text("company").notNull(),
    date: text("date").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (experiencesIdx) => ({
    experienceId: index("experience_id_idx").on(experiencesIdx.id),
    nameIndex: index("expereience_name_idx").on(experiencesIdx.name),
  }),
);
