/**
 * TODO
 * [x] 1. localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다. (Read/Write)
 *
 * [x?] 1. 에스프레소, 2. 프라푸치노, 3. 블렌디드, 4. 티바나, 5. 디저트 각각의
 * 종류별로 메뉴판을 관리할 수 있게 만든다.
 *
 * [] 1. 페이지에 최초로 접근할 때는 2. 에스프레소 메뉴가 먼저 보이게 한다.
 * 품절 상태인 경우를 보여줄 수 있게, 1. 품절 버튼을 추가하고 2. sold-out class를 추가하여 상태를 변경한다.
 */
import { $ } from "./utils/dom.js";
import store from "./store/index.js";

function App() {
  // 상태는 변하는 데이터. 이 앱에서 변하는 것이 무엇인가? - 갯수, 메뉴명

  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    dessert: [],
  };
  this.currentCategory = "espresso";
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
    initEventListeners();
  };

  const render = () => {
    // 객체이름['key'] <-- 대괄호 표기법
    const template = this.menu[this.currentCategory]
      .map((menuItem, _index) => {
        return `<li class="menu-list-item d-flex items-center py-2" data-menu-id="${_index}">
                <span class="${menuItem.soldOut ? "sold-out" : ""} w-100 pl-2 menu-name">${
          menuItem.name
        }</span>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
            품절 
          </button>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
            수정 
          </button>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
            삭제
          </button>
        </li>
        `;
      })
      .join("");

    $("#menu-list").innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    if ($("#menu-name").value.trim() == "") {
      alert("메뉴를 정확히 입력해주세요");
      return false;
    }

    const menuName = $("#menu-name").value.trim();
    this.menu[this.currentCategory].push({ name: menuName });
    store.setLocalStorage(this.menu);
    // console.log("this.menu: ", this.menu);

    render();
    $("#menu-name").value = "";
  };

  const initEventListeners = () => {
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $("#menu-submit-button").addEventListener("click", addMenuName);

    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        return false;
      }
      if (e.key === "Enter") {
        addMenuName();
      }
    });

    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return;
      }
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }
      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });

    $("nav").addEventListener("click", (e) => {
      const isCategoryBtn = e.target.classList.contains("cafe-category-name");
      if (isCategoryBtn) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
        render();
        // console.log("categoryName: ", categoryName);
      }
    });
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updateMenuName = prompt("수정할 메뉴명을 입력해주세요", $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updateMenuName;
    store.setLocalStorage(this.menu);
    render();
  };

  // ! 이 코드는 문제가 있음. 순서대로 삭제하지 않을 경우 menuId와 localStorage Array 순서와 틀려진다.
  const removeMenuName = (e) => {
    if (confirm("정말 삭제?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
      updateMenuCount();
    }
  };

  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  };
}

// App();

const app = new App();
app.init();
