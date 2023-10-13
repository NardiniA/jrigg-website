export const sendData = async (id: string, dataToSend: { field: string, value: any }[]): Promise<[any, null] | [null, any]> => {
  try {
    const res = await fetch(`/api/form-submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        form: id,
        submissionData: dataToSend,
      }),
    });

    console.log(res);

    if (!res.ok) throw new Error("Data rejected", {
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