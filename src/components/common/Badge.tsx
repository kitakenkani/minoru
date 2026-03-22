interface BadgeProps {
  label: string;
}

export function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-block rounded bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
      {label}
    </span>
  );
}
