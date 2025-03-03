"use client"

import * as React from "react"

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(value)

    React.useEffect(() => {
      setSelectedValue(value)
    }, [value])

    const handleSelect = (newValue: string) => {
      setSelectedValue(newValue)
      if (onValueChange) {
        onValueChange(newValue)
      }
      setIsOpen(false)
    }

    // Find the selected item's text
    let selectedText = "Select...";
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === SelectTrigger) {
        React.Children.forEach((child as React.ReactElement).props.children, (triggerChild) => {
          if (React.isValidElement(triggerChild) && triggerChild.type === SelectValue) {
            selectedText = (triggerChild as React.ReactElement).props.children || selectedText;
          }
        });
      }
    });

    // Find the selected item's text from content
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === SelectContent) {
        React.Children.forEach((child as React.ReactElement).props.children, (contentChild) => {
          if (React.isValidElement(contentChild) && contentChild.type === SelectItem && 
              (contentChild as React.ReactElement<any>).props.value === selectedValue) {
            selectedText = (contentChild as React.ReactElement).props.children || selectedText;
          }
        });
      }
    });

    return (
      <div ref={ref} className={`relative ${className}`} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === SelectTrigger) {
              return React.cloneElement(child as React.ReactElement<any>, {
                onClick: () => setIsOpen(!isOpen),
                children: React.Children.map(child.props.children, (triggerChild) => {
                  if (React.isValidElement(triggerChild) && triggerChild.type === SelectValue) {
                    return React.cloneElement(triggerChild as React.ReactElement<any>, {
                      children: selectedText
                    });
                  }
                  return triggerChild;
                })
              });
            }
            if (child.type === SelectContent) {
              return isOpen ? React.cloneElement(child as React.ReactElement<any>, {
                children: React.Children.map((child as React.ReactElement).props.children, (contentChild) => {
                  if (React.isValidElement(contentChild) && contentChild.type === SelectItem) {
                    return React.cloneElement(contentChild as React.ReactElement<any>, {
                      onClick: () => handleSelect((contentChild as React.ReactElement<any>).props.value)
                    });
                  }
                  return contentChild;
                })
              }) : null;
            }
            return child;
          }
          return child;
        })}
      </div>
    )
  }
)
Select.displayName = "Select"

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  >
    {props.children}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  </button>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  SelectValueProps
>(({ className, placeholder, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={`block truncate ${className}`}
      {...props}
    >
      {props.children || placeholder}
    </span>
  );
})
SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`absolute top-full left-0 z-50 mt-1 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 ${className}`}
    {...props}
  />
))
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    {...props}
  />
))
SelectItem.displayName = "SelectItem"

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
