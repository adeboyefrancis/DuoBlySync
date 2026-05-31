import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const methods = {
  GET: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  POST: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  PUT: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  DELETE: "bg-red-500/10 text-red-600 border-red-500/20",
};

const entityEndpoints = [
  {
    method: "GET",
    path: "/entities/{name}/list",
    desc: "List all records with sorting",
  },
  {
    method: "GET",
    path: "/entities/{name}/filter",
    desc: "Filter records by query",
  },
  {
    method: "POST",
    path: "/entities/{name}/create",
    desc: "Create a new record",
  },
  {
    method: "POST",
    path: "/entities/{name}/bulk-create",
    desc: "Bulk create records",
  },
  {
    method: "PUT",
    path: "/entities/{name}/{id}",
    desc: "Update a record by ID",
  },
  {
    method: "DELETE",
    path: "/entities/{name}/{id}",
    desc: "Delete a record by ID",
  },
];

export default function ApiEndpointList({ entityNames }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <div className="p-5 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          API Endpoints
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Available for each entity via the SDK
        </p>
      </div>
      <div className="divide-y divide-border">
        {entityEndpoints.map((endpoint, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
            className="px-5 py-3 flex items-center gap-3 hover:bg-secondary/30 transition-colors"
          >
            <Badge
              variant="outline"
              className={`font-mono text-[10px] font-semibold px-2 py-0.5 ${methods[endpoint.method]}`}
            >
              {endpoint.method}
            </Badge>
            <code className="font-mono text-sm text-foreground flex-1">
              {endpoint.path}
            </code>
            <span className="text-xs text-muted-foreground hidden sm:block">
              {endpoint.desc}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="p-5 border-t border-border bg-secondary/20">
        <p className="text-xs text-muted-foreground">
          Applies to:{" "}
          {entityNames.map((name, i) => (
            <span key={name}>
              <code className="text-primary font-mono">{name}</code>
              {i < entityNames.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
    </motion.div>
  );
}
