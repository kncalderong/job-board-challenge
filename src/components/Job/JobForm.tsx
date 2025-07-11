"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormStatus } from "react-dom";
import { Job } from "@/types/jobs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addJobAction, updateJobAction } from "@/helpers/actions";
import { useActionState } from "react";

export function JobForm({ job }: { job?: Job | null }) {
  const [error, action] = useActionState(
    job == null ? addJobAction : updateJobAction.bind(null, job.id),
    {}
  );

  console.log("JobForm error:", error);
  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={job?.title || ""}
        />
        {error.title && <div className="text-red">{error.title}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          type="text"
          id="company"
          name="company"
          required
          defaultValue={job?.company || ""}
        />
        {error.company && <div className="text-red">{error.company}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          type="text"
          id="location"
          name="location"
          required
          defaultValue={job?.location || ""}
        />
        {error.location && <div className="text-red">{error.location}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Job Type</Label>
        <Select name="type" defaultValue={job?.type || "Full-time"}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue className="" placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Job Type</SelectLabel>
              {["Full-time", "Part-time", "Contract"].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {error.type && <div className="text-red">{error.type}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={job?.description}
          required
        />
        {error.description && (
          <div className="text-red">{error.description}</div>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-semi-dark-blue uppercase hover:bg-light-blue hover:text-dark-blue transition-colors duration-200 w-20 cursor-pointer"
    >
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
