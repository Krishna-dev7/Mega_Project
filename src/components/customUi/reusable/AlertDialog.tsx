import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger } from "@/components/ui/alert-dialog";

type ConfirmDialogProps = {
  children: React.ReactNode,
  action: () => void,
  title: string,
  description: string,
  triggerDisabled?: boolean
}

const ConfirmDialog:React.FC<ConfirmDialogProps> = ({
  children,
  action,
  title,
  description,
  triggerDisabled
}) => {

  return <AlertDialog >
  <AlertDialogTrigger
    disabled={triggerDisabled}
    suppressHydrationWarning>
      {children}
  </AlertDialogTrigger>
    
  <AlertDialogContent suppressHydrationWarning>
    <AlertDialogHeader 
      className="text-orange-400 font-bold text-sm">
        <AlertDialogTitle>{title}</AlertDialogTitle>
    </AlertDialogHeader>
      
    <AlertDialogDescription>
      {description}
    </AlertDialogDescription>

    <AlertDialogFooter>
      <AlertDialogCancel>cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={action}> 
          delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
}


export default ConfirmDialog