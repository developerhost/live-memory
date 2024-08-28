import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground shadow-sm">
      <div className="text-lg font-bold">Live Memory</div>
      <Button variant="secondary" size="sm">
        Login
      </Button>
    </header>
  );
}
