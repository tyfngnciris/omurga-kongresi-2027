import { STATUS_LABELS, STATUS_COLORS } from "@/lib/abstract-constants";

export default function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || { bg: "#F1EFE8", text: "#444441" };
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
      style={{ backgroundColor: color.bg, color: color.text }}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}
