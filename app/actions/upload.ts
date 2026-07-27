"use server";

export async function uploadImage(formData: FormData) {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return { success: false, error: "Server upload key not configured" };
  }

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (result.success && result.data?.url) {
      return { success: true, url: result.data.url };
    }

    return { success: false, error: "Failed to upload image" };
  } catch {
    return { success: false, error: "Network error during upload" };
  }
}