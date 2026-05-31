import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Database,
  Key,
  Hash,
  Type,
  List,
  ToggleLeft,
  Calendar,
  Link2,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const typeIcons = {
  string: Type,
  number: Hash,
  boolean: ToggleLeft,
  array: List,
  object: Layers,
};

const typeColors = {
  string: "text-emerald-400",
  number: "text-amber-400",
  boolean: "text-purple-400",
  array: "text-cyan-400",
  object: "text-rose-400",
};

function PropertyRow({ name, property, isRequired }) {
  const Icon = typeIcons[property.type] || Type;
  const color = typeColors[property.type] || "text-muted-foreground";
  const isEnum = property.enum && property.enum.length > 0;
  const isDateFormat =
    property.format === "date" || property.format === "date-time";

  return (
    <div className="flex items-start gap-3 py-2.5 px-3 rounded-lg hover:bg-secondary/50 transition-colors group">
      <div className={`mt-0.5 ${color}`}>
        {isDateFormat ? (
          <Calendar className="w-3.5 h-3.5" />
        ) : (
          <Icon className="w-3.5 h-3.5" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium text-foreground">
            {name}
          </span>
          {isRequired && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 border-primary/30 text-primary bg-primary/5"
            >
              required
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`font-mono text-xs ${color}`}>{property.type}</span>
          {property.format && (
            <span className="font-mono text-xs text-muted-foreground">
              ({property.format})
            </span>
          )}
        </div>
        {property.description && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {property.description}
          </p>
        )}
        {isEnum && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {property.enum.map((val) => (
              <span
                key={val}
                className="inline-block px-1.5 py-0.5 text-[10px] font-mono bg-secondary rounded text-muted-foreground"
              >
                {val}
              </span>
            ))}
          </div>
        )}
        {property.type === "array" && property.items && (
          <div className="mt-1.5 pl-3 border-l-2 border-border">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              items
            </span>
            {property.items.type === "object" && property.items.properties && (
              <div className="mt-1 space-y-1">
                {Object.entries(property.items.properties).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-muted-foreground">
                      {k}:
                    </span>
                    <span
                      className={`font-mono ${typeColors[v.type] || "text-muted-foreground"}`}
                    >
                      {v.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {property.items.type === "string" && property.items.enum && (
              <div className="flex flex-wrap gap-1 mt-1">
                {property.items.enum.map((val) => (
                  <span
                    key={val}
                    className="inline-block px-1.5 py-0.5 text-[10px] font-mono bg-secondary rounded text-muted-foreground"
                  >
                    {val}
                  </span>
                ))}
              </div>
            )}
            {property.items.type &&
              !property.items.properties &&
              !property.items.enum && (
                <span
                  className={`text-xs font-mono ${typeColors[property.items.type] || "text-muted-foreground"}`}
                >
                  {property.items.type}
                </span>
              )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EntityCard({
  entity,
  color,
  icon: IconComponent,
  delay = 0,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const properties = entity.properties || {};
  const required = entity.required || [];
  const propertyCount = Object.keys(properties).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-foreground">
                  {entity.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {propertyCount} fields • {required.length} required
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </div>

          {/* Built-in fields hint */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {["id", "created_date", "updated_date", "created_by"].map(
              (field) => (
                <span
                  key={field}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-muted rounded-full text-muted-foreground"
                >
                  <Key className="w-2.5 h-2.5" />
                  {field}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Expandable properties */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border px-3 py-3 space-y-0.5 max-h-[400px] overflow-y-auto">
                {Object.entries(properties).map(([name, property]) => (
                  <PropertyRow
                    key={name}
                    name={name}
                    property={property}
                    isRequired={required.includes(name)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
