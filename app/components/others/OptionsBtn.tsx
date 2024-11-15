"use client";

const OptionsBtn = () => {
  const temporaryFix = () => {
    alert(
      "This button is currently just a cosmetic feature. We encourage you to engage with the community instead"
    );
  };

  return (
    <button
      // onClick={() => setModalOpen(true)}
      onClick={temporaryFix}
      className="h-full flex flex-col justify-center items-center gap-2 pr-5"
    >
      <div className="w-[20px] h-[2px] bg-black rounded-md" />
      <div className="w-[20px] h-[2px] bg-black rounded-md" />
      <div className="w-[20px] h-[2px] bg-black rounded-md" />
    </button>
  );
};

export default OptionsBtn;
