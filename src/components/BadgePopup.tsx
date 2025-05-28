import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

export function BadgePopup({ open, onClose, badge }: { open: boolean; onClose: () => void; badge: { name: string; description?: string; icon?: React.ReactNode } }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center justify-center py-8 px-6">
        {badge.icon && <div className="mb-3 text-primary text-4xl">{badge.icon}</div>}
        <DialogTitle className="mb-1">{badge.name}</DialogTitle>
        <div className="mb-4 text-muted-foreground text-center text-sm">{badge.description}</div>
        <button className="mt-2 rounded px-3 py-2 bg-primary text-primary-foreground" onClick={onClose}>
          <span className="flex items-center justify-center gap-1">OK <X size={16} /></span>
        </button>
      </DialogContent>
    </Dialog>
  );
}
