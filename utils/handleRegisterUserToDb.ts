export // register user to db
const handleRegisterUserToDb = async (
  display_name: string,
  email: string,
  user_id: string
) => {
  try {
    const result = await fetch("/api/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ display_name, email, user_id }),
    });
  } catch (error) {
    console.log("Error inserting data into db: ", error);
  } finally {
    toast.success("Saved!");
    router.refresh();
  }
};
