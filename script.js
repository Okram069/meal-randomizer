document.addEventListener("DOMContentLoaded", () => {
  const exportBtn = document.getElementById("export-json");
  const importBtn = document.getElementById("import-json");

  exportBtn.addEventListener("click", () => {
    const data = localStorage.getItem("meals");
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "meals.json";
    a.click();
  });

  importBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        localStorage.setItem("meals", e.target.result);
        location.reload();
      };
      reader.readAsText(file);
    };
    input.click();
  });
});