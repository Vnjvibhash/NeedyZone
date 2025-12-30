import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Spec {
  label: string
  value: string
}

interface SpecificationTableProps {
  specs: Spec[]
}

export function SpecificationTable({ specs }: SpecificationTableProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Specification</TableHead>
            <TableHead className="font-semibold">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specs.map((spec, index) => (
            <TableRow key={spec.label} className={index % 2 === 0 ? "bg-card" : "bg-muted/20"}>
              <TableCell className="font-medium">{spec.label}</TableCell>
              <TableCell className="text-muted-foreground">{spec.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
