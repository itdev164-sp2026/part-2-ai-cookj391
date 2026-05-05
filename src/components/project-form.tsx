"use client"

import React, { useTransition } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema, type Project } from "@/lib/schemas"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { createProject } from "@/app/actions"

type FormValues = Project

export function ProjectForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { title: "", description: "", status: "active" },
  })

  const [isPending, startTransition] = useTransition()

  async function onSubmit(values: FormValues) {
    startTransition(() =>
      createProject(values).then((res) => {
        if (res?.success) {
          toast.success("Project created")
          reset()
        } else {
          toast.error(res?.error ?? "Unable to create project")
        }
      })
    )
  }

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field>
          <FieldLabel>Title</FieldLabel>
          <FieldContent>
            <Input {...register("title") as any} />
            <FieldError errors={errors.title ? [{ message: errors.title.message }] : []} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Description</FieldLabel>
          <FieldContent>
            <Textarea {...register("description") as any} />
            <FieldError errors={errors.description ? [{ message: errors.description.message }] : []} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Status</FieldLabel>
          <FieldContent>
            <Controller
              control={control}
              name="status"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue>{value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={errors.status ? [{ message: errors.status.message }] : []} />
          </FieldContent>
        </Field>

        <div>
          <Button type="submit" disabled={isPending}>
            Create Project
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
