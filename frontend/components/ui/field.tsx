import * as React from "react"
import { cn } from "@/lib/utils"

type FieldContextType = {
  id: string
}

const FieldContext = React.createContext<FieldContextType | null>(null)

/* -------------------------------------------------------------------------- */
/*                                   Field                                    */
/* -------------------------------------------------------------------------- */

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string
}

export function Field({ id, className, ...props }: FieldProps) {
  const generatedId = React.useId()
  const fieldId = id ?? generatedId

  return (
    <FieldContext.Provider value={{ id: fieldId }}>
      <div
        className={cn("space-y-2", className)}
        {...props}
      />
    </FieldContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 FieldLabel                                 */
/* -------------------------------------------------------------------------- */

interface FieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function FieldLabel({
  className,
  ...props
}: FieldLabelProps) {
  const context = React.useContext(FieldContext)
  if (!context) {
    throw new Error("FieldLabel must be used inside <Field>")
  }

  return (
    <label
      htmlFor={context.id}
      className={cn(
        "text-sm font-medium leading-none",
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                              FieldDescription                              */
/* -------------------------------------------------------------------------- */

interface FieldDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FieldDescription({
  className,
  ...props
}: FieldDescriptionProps) {
  const context = React.useContext(FieldContext)
  if (!context) {
    throw new Error("FieldDescription must be used inside <Field>")
  }

  return (
    <p
      id={`${context.id}-description`}
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}