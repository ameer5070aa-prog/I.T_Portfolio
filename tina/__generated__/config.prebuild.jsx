// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || "master";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "hero",
        label: "Hero Section",
        path: "src/content",
        format: "json",
        match: {
          include: "hero"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "statusBadge",
            label: "Status Badge",
            required: true
          },
          {
            type: "string",
            name: "headline",
            label: "Headline",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "skills",
            label: "Skills",
            required: true,
            list: true
          }
        ]
      },
      {
        name: "about",
        label: "About Section",
        path: "src/content",
        format: "json",
        match: {
          include: "about"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Section Title",
            required: true
          },
          {
            type: "rich-text",
            name: "bio",
            label: "Bio",
            required: true
          },
          {
            type: "object",
            name: "stats",
            label: "Stats",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label"
              },
              {
                type: "string",
                name: "value",
                label: "Value"
              }
            ]
          }
        ]
      },
      {
        name: "projects",
        label: "Projects",
        path: "src/content/projects",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "covers",
            label: "What This Project Covers",
            list: true,
            required: true
          },
          {
            type: "string",
            name: "skills",
            label: "Skills Demonstrated",
            list: true,
            required: true
          },
          {
            type: "string",
            name: "importance",
            label: "Why It Matters",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "videoUrl",
            label: "YouTube Video URL"
          },
          {
            type: "number",
            name: "order",
            label: "Display Order"
          }
        ]
      },
      {
        name: "contact",
        label: "Contact Info",
        path: "src/content",
        format: "json",
        match: {
          include: "contact"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "email",
            label: "Email",
            required: true
          },
          {
            type: "string",
            name: "linkedin",
            label: "LinkedIn URL"
          },
          {
            type: "string",
            name: "github",
            label: "GitHub URL"
          },
          {
            type: "string",
            name: "twitter",
            label: "Twitter/X URL"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
