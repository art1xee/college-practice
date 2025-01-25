const createAd = async (formData: any) => {
    const response = await fetch("/api/new-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure Content-Type is set to JSON
      },
      body: JSON.stringify(formData), // Convert form data to JSON string
    });
  
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to create ad");
    }
    return result;
  };
  