let mainBtn = window.Telegram.WebApp.MainButton;
let backBtn = window.Telegram.WebApp.BackButton;
let webApp = window.Telegram.WebApp;

class Product {
    constructor(id,
                name,
                category,
                gender,
                season,
                image,
                price,
                description,
                sizes,
                colors)
    {
        this.id = id;
        this.name = name;
        this.category = category;
        this.gender = gender;
        this.season = season;
        this.image = image;
        this.price = price;
        this.description = description;
        this.sizes = sizes;
        this.colors = colors;
    }
}

const text = 'Эти кроссовки от Nike обеспечивают отличную поддержку стопы и амортизацию благодаря современным технологиям, используемым в их производстве. Они идеально подходят для прогулок, бега и занятий спортом, предоставляя комфорт и уверенность в каждом шаге. Белый цвет кроссовок делает их универсальными и легко сочетаемыми с различной одеждой.';
const sizes = ["S", "M", "L"];
const colors = ["Белый", "Чёрный"];

const products = [
    new Product(1, "Кроссовки Nike Белые", "обувь", "женское", "весна", "sneakers/1.jpg", 7990, text, sizes, colors),
    new Product(2, "Кроссовки New Balance Белые", "обувь", "женское", "весна", "sneakers/2.jpg", 12490, text,  sizes, colors),
    new Product(3, "Кроссовки Nike Sony", "обувь", "мужское", "весна", "sneakers/3.jpg", 15990, text,  sizes, colors),
    new Product(4, "Кроссовки Чёрные", "обувь", "мужское", "весна", "sneakers/4.jpg", 12390, text,  sizes, colors),
    new Product(5, "Кроссовки New Balance", "обувь", "мужское", "весна", "sneakers/5.jpg", 7490, "Описание товара 5", sizes, colors),
    new Product(6, "Кроссовки New Balance", "обувь", "мужское", "весна", "sneakers/6.jpg", 5490, "Описание товара 6", sizes, colors),
    new Product(7, "Штаны Чёрные Мужские", "верхняя_одежда", "мужское", "весна", "pants/1.jpg", 7990, "Описание товара 7", sizes, colors),
    new Product(8, "Кроссовки Nike Белые", "верхняя_одежда", "женское", "весна", "tshirt/1.jpg", 5490, "Описание товара 8", sizes, colors),
    new Product(9, "Кроссовки New Balance Белые", "верхняя_одежда", "женское", "весна", "tshirt/2.jpg", 7990, "Описание товара 9", sizes, colors),
    new Product(10, "Кроссовки Nike Sony", "верхняя_одежда", "мужское", "весна", "tshirt/3.jpg", 7990, "Описание товара 10", sizes, colors),
    new Product(11, "Пуховик зимний", "верхняя_одежда", "мужское", "весна", "tshirt/4.jpg", 5490, "Описание товара 11", sizes, colors),
    new Product(12, "Футболка Inspire Чёрная", "верхняя_одежда", "мужское", "весна", "tshirt/5.jpg", 5490, "Описание товара 12", sizes, colors),
    new Product(13, "Футболка Brooklyn Белая", "верхняя_одежда", "мужское", "весна", "tshirt/6.jpg", 12390, "Описание товара 13", sizes, colors),
    new Product(14, "Футболки хайповые", "верхняя_одежда", "мужское", "весна", "tshirt/7.jpg", 7990, "Описание товара 14", sizes, colors)
];

webApp.setHeaderColor('#303030');
mainBtn.text_color = '#FFFFFF';
mainBtn.color = '#3953f8';
mainBtn.text = 'Перейти в корзину';
mainBtn.onClick(mainBtnClicked);
backBtn.onClick(backBtnClicked);

document.addEventListener("DOMContentLoaded", function() {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  themeToggle.addEventListener("click", function() {
    body.classList.toggle("dark-theme");
    toggleTheme();
  });

  // Функция для сохранения текущей темы в локальном хранилище
  function toggleTheme() {
    if (body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }
});

    function displayProducts(categoryFilter = "", genderFilter = "", seasonFilter = "") {
      const productList = document.getElementById("productList");
      productList.innerHTML = "";

      const productRow = document.createElement("div");
      productRow.className = "row";
      products.forEach(product => {
        if (
          (!categoryFilter || product.category === categoryFilter) &&
          (!genderFilter || product.gender === genderFilter) &&
          (!seasonFilter || product.season === seasonFilter)
        ) {
          const productCard = document.createElement("div");
          productCard.className = "col-md-12 product-card";
          productCard.innerHTML = `
            <div class="product-card" 
                 id="productCard"
                 data-id="${product.id}"
                 data-price="${product.price}"
                 data-name="${product.name}"
                 data-image="${product.image}"
                 data-description="${product.description}"
                 data-season="${product.season}"
                 data-category="${product.category}"
                 data-category="${product.gender}">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-description-text ">${product.description}</p>
                <p class="card-text">${product.price}₽</p>
              </div>
              <div class="order-data">
                <select id="sizes" name="sizes" class="comboBox">
                    <option value="" disabled selected>Размер</option>
                </select>

                <select id="colors" name="colors" class="comboBox">
                    <option value="" disabled selected>Цвет</option>  
                </select>
              </div>
              <div class="product-action">
                <button class="add-to-cart-button bubbly-button" id="add-to-cart-button" onclick="addOrderItem(this)">Изменить</button>
                <button class="add-to-cart-button bubbly-button" id="update-order-item-button" onclick="updateOrderItem(this)" style="display: none">Сохранить</button>
                <button class="add-to-cart-button bubbly-button" id="delete-order-item-button" onclick="deleteOrderItem(this)" style="display: none">Удалить</button>
              </div>
            </div>
          `;
          updateDropDowns(productCard, product);
          productRow.appendChild(productCard);
        }
      });

      productList.appendChild(productRow);
    }

    function updateDropDowns(productCard, product) {
        var sizesDropdown = productCard.querySelector("#sizes");
        var colorsDropdown = productCard.querySelector("#colors");

        var availableSizes = product.sizes;
        var availableColors = product.colors;

        for (var i = 0; i < availableSizes.length; i++) {
            var sizeOption = document.createElement("option");
            sizeOption.value = availableSizes[i];
            sizeOption.text = availableSizes[i];
            sizesDropdown.appendChild(sizeOption);
        }

        for (var j = 0; j < availableColors.length; j++) {
            var colorOption = document.createElement("option");
            colorOption.value = availableColors[j];
            colorOption.text = availableColors[j];
            colorsDropdown.appendChild(colorOption);
        }
    }

    const filterMenu = document.getElementById("filterMenu");
    const showFilters = document.getElementById("showFilters");

    showFilters.addEventListener("click", () => {
      if (filterMenu.style.display === "block") {
        filterMenu.style.display = "none";
      } else {
        filterMenu.style.display = "block";
      }
    });

    var previousSelectedBtn = document.getElementById('home-section-btn');
    var previousSection = document.getElementById('home-section');
    var section;

    function onPageBtnClicked(btn){
        selectedStyle(btn);

        if(previousSelectedBtn != null || previousSelectedBtn !== undefined){
            unselectedStyle(previousSelectedBtn)
        }

        previousSelectedBtn = btn;

        switch (btn.id) {
            case 'home-section-btn':
                section = document.getElementById('home-section');
                section.style.display = 'block';
                previousSection.style.display = 'none';
                previousSection = section;
                break;
            case 'edit-section-btn':
                section = document.getElementById('edit-section');
                section.style.display = 'block';
                previousSection.style.display = 'none';
                previousSection = section;
                break;
            case 'orders-section-btn':
                section = document.getElementById('orders-section');
                section.style.display = 'block';
                previousSection.style.display = 'none';
                previousSection = section;
                break;
            case 'stat-section-btn':
                section = document.getElementById('stat-section');
                section.style.display = 'block';
                previousSection.style.display = 'none';
                previousSection = section;
                break;
            case 'settings-section-btn':
                section = document.getElementById('settings-section');
                section.style.display = 'block';
                previousSection.style.display = 'none';
                previousSection = section;
                break;
            default:
        }
    }

    function selectedStyle(btn){
        btn.classList.add('active');
    }

    function unselectedStyle(btn){
        btn.classList.remove('active');
    }

    function mainBtnClicked(){

    }

     function backBtnClicked(){

    }

      function toggleOptions() {
            var options = document.getElementById('options');
            options.classList.toggle('show');
        }

        function toggleOption(value) {
            var checkbox = document.getElementById(value + 'Checkbox');
            var originalSelect = document.getElementById('originalSelect');
            var optionToToggle = Array.from(originalSelect.options).find(option => option.value === value);

            if (optionToToggle) {
                optionToToggle.selected = checkbox.checked;
                updateSelectedOptions();
            }
        }

        function updateSelectedOptions() {
            var selectedOptionsContainer = document.getElementById('selectedOptions');
            selectedOptionsContainer.innerHTML = '';

            var selectedOptions = Array.from(document.getElementById('originalSelect').selectedOptions);

            selectedOptions.forEach(function(option) {
                var optionElement = document.createElement('div');
                optionElement.className = 'selected-option';
                optionElement.innerHTML = option.label + '<span class="remove-option" onclick="removeOption(\'' + option.value + '\')">x</span>';
                selectedOptionsContainer.appendChild(optionElement);
            });
        }

        function removeOption(value) {
            var originalSelect = document.getElementById('originalSelect');
            var optionToRemove = Array.from(originalSelect.options).find(option => option.value === value);

            if (optionToRemove) {
                optionToRemove.selected = false;
                updateSelectedOptions();
            }
        }

    displayProducts();