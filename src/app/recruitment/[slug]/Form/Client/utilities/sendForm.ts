export const sendForm = async (formData: FormData): Promise<[any, null] | [null, any]> => {
  try {
    const res = await fetch("/api/applications", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to submit application", {
      cause: {
        res,
      },
    });

    const data = await res.json();

    return [data, null];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
}