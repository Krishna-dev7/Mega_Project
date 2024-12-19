"use client"
import React, { useState } from "react"
import { 
  FormLabel
} from "../ui/form"
import { FileUpload } from "../ui/file-upload"

const AvatarField: React.FC = () => {

  const [avatar, setAvatar] = useState<File>()

  return <div className="w-full border border-dashed mt-5 bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
    <FormLabel className="font-semibold text-sm text-gray-700 block mb-3">Avatar</FormLabel>
    <FileUpload
      key="fileupload"
      onChange={(files: File[]) => setAvatar(files[0])}
    />
  </div>
}

export default AvatarField;