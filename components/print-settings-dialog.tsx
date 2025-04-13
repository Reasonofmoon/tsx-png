"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Printer, FileDown } from "lucide-react"

interface PrintSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: {
    pageSize: string
    orientation: string
    margins: string
    scale: number
  }
  onUpdateSettings: (settings: any) => void
}

export default function PrintSettingsDialog({
  open,
  onOpenChange,
  settings,
  onUpdateSettings,
}: PrintSettingsDialogProps) {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    onUpdateSettings(localSettings)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            PDF Export Settings
          </DialogTitle>
          <DialogDescription>
            Customize how your component will be exported to PDF. These settings affect the layout and appearance of the
            generated PDF.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Page Size</Label>
            <RadioGroup
              value={localSettings.pageSize}
              onValueChange={(value) => setLocalSettings({ ...localSettings, pageSize: value })}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a4" id="a4" />
                <Label htmlFor="a4">A4 (210 × 297 mm)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="letter" id="letter" />
                <Label htmlFor="letter">Letter (8.5 × 11 in)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="legal" id="legal" />
                <Label htmlFor="legal">Legal (8.5 × 14 in)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Orientation</Label>
            <RadioGroup
              value={localSettings.orientation}
              onValueChange={(value) => setLocalSettings({ ...localSettings, orientation: value })}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="portrait" id="portrait" />
                <Label htmlFor="portrait">Portrait</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="landscape" id="landscape" />
                <Label htmlFor="landscape">Landscape</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Margins</Label>
            <RadioGroup
              value={localSettings.margins}
              onValueChange={(value) => setLocalSettings({ ...localSettings, margins: value })}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal">Normal (1 cm)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="narrow" id="narrow" />
                <Label htmlFor="narrow">Narrow (0.5 cm)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Scale</Label>
              <span className="text-sm text-gray-500">{localSettings.scale.toFixed(1)}x</span>
            </div>
            <Slider
              value={[localSettings.scale]}
              min={0.5}
              max={1.5}
              step={0.1}
              onValueChange={(value) => setLocalSettings({ ...localSettings, scale: value[0] })}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Smaller</span>
              <span>Larger</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Apply Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
