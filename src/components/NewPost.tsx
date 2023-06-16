"use client";
import { AuthUser } from "@/model/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from "react";
import PostUserAvartar from "./PostUserAvartar";
import Button from "./ui/Button";
import FilesIcons from "./ui/icons/FilesIcons";
import GridSpinner from "./ui/GridSpinner";

type Prop = {
  user: AuthUser;
};
export default function NewPost({ user: { username, image } }: Prop) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [testarea, setTextarea] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;

    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;

    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(testarea);
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch(`/api/posts`, { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => {
        setError(err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      {loading && (
        <div className="absolute inset-0 text-center pt-[20%] z-20 bg-sky-500/20">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="w-full text-red-600 p-6 text-center font-bold bg-red-300">
          {error}
        </p>
      )}
      <PostUserAvartar username={username} image={image ?? ""} />
      <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
        <input
          className="hidden"
          type="file"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        ></input>
        <label
          className={`w-full h-60 flex flex-col items-center justify-center mt-2 ${
            !file && "border-2 border-dashed border-sky-200"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none"></div>
          )}
          {!file && (
            <div>
              <FilesIcons />
              <p>Drop and Drop your image</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local image"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none text-lg border-2 border-neutal-300 "
          name="text"
          id="input-text"
          rows={10}
          placeholder="write test"
          required
          // onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          //   setTextarea(e.currentTarget.value)
          // }
          ref={textRef}
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
