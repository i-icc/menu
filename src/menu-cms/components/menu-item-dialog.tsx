"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";
import { MenuItem, MenuItemFormData } from "@/lib/types";
import { useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { Plus, Trash2, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  image: z.string(),
  imageFile: z.any().optional(),
  steps: z.array(z.string().min(1, "Step cannot be empty")),
  tags: z.array(z.string()),
});

interface MenuItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: MenuItem | null;
  onClose: () => void;
}

export function MenuItemDialog({
  open,
  onOpenChange,
  item,
  onClose,
}: MenuItemDialogProps) {
  const { addMenuItem, updateMenuItem, tags } = useStore();
  const form = useForm<MenuItemFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      steps: [""],
      tags: [],
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > MAX_FILE_SIZE) {
        form.setError("image", {
          type: "manual",
          message: "File size must be less than 5MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          form.setValue("image", e.target.result as string);
          form.setValue("imageFile", file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
  });

  useEffect(() => {
    if (item) {
      form.reset({
        name: item.name,
        description: item.description || "",
        image: item.image,
        steps: item.steps.length > 0 ? item.steps : [""],
        tags: item.tags.map((tag) => tag.id),
      });
    } else {
      form.reset({
        name: "",
        description: "",
        image: "",
        steps: [""],
        tags: [],
      });
    }
  }, [item, form]);

  const onSubmit = (data: MenuItemFormData) => {
    const selectedTags = tags.filter((tag) => data.tags.includes(tag.id));
    const menuItem: MenuItem = {
      id: item?.id || Math.random().toString(36).substr(2, 9),
      ...data,
      steps: data.steps.filter((step) => step.trim() !== ""),
      tags: selectedTags,
    };

    if (item) {
      updateMenuItem(item.id, menuItem);
    } else {
      addMenuItem(menuItem);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                        isDragActive
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">
                          {isDragActive ? (
                            <p>Drop the image here</p>
                          ) : (
                            <p>
                              Drag and drop an image here, or click to select one
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  {field.value && (
                    <div className="mt-2">
                      <img
                        src={field.value}
                        alt="Preview"
                        className="max-h-40 rounded-lg mx-auto"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <FormLabel>Steps</FormLabel>
              {form.watch("steps").map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`steps.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input {...field} placeholder={`Step ${index + 1}`} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const steps = form.getValues("steps");
                            if (steps.length > 1) {
                              const newSteps = steps.filter((_, i) => i !== index);
                              form.setValue("steps", newSteps);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  const steps = form.getValues("steps");
                  form.setValue("steps", [...steps, ""]);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Step
              </Button>
            </div>
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    {tags.map((tag) => (
                      <FormField
                        key={tag.id}
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={tag.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(tag.id)}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...field.value, tag.id]
                                      : field.value?.filter(
                                          (value) => value !== tag.id
                                        );
                                    field.onChange(newValue);
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-medium leading-none">
                                  {tag.title}
                                </FormLabel>
                                <p className="text-sm text-muted-foreground">
                                  {tag.description}
                                </p>
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{item ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}