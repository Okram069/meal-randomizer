let meals = [];

function saveMeal() {
  const name = document.getElementById('mealName').value.trim();
  if (!name) return alert('Enter a meal name.');
  meals.push({ name });
  document.getElementById('mealName').value = '';
  updateMealCount();
  alert('Meal saved!');
}

function updateMealCount() {
  document.getElementById('meal-count').textContent = meals.length;
}

function exportMeals() {
  const blob = new Blob([JSON.stringify(meals, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'meals.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importMeals(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      meals = JSON.parse(e.target.result);
      updateMealCount();
      alert('Meals imported successfully!');
    } catch (err) {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}

function startRandomizer() {
  const days = parseInt(document.getElementById('days').value);
  if (isNaN(days) || days <= 0) return alert('Enter a valid number of days.');
  alert(`Randomizing ${days} meals...`);
}

function confirmCategories() {
  closePopup();
}

function closePopup() {
  document.getElementById('categoryPopup').classList.add('hidden');
}
