/**
 * TODO
 * 1. localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다. (Read/Write)
 *
 * 1. 에스프레소, 2. 프라푸치노, 3. 블렌디드, 4. 티바나, 5. 디저트 각각의
 * 종류별로 메뉴판을 관리할 수 있게 만든다.
 *
 * 1. 페이지에 최초로 접근할 때는 2. 에스프레소 메뉴가 먼저 보이게 한다.
 * 품절 상태인 경우를 보여줄 수 있게, 1. 품절 버튼을 추가하고 2. sold-out class를 추가하여 상태를 변경한다.
 */

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  // 상태는 변하는 데이터. 이 앱에서 변하는 것이 무엇인가? - 갯수, 메뉴명
  this.menu = [];
  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
      render();
    }
  };

  const render = () => {
    const template = this.menu
      .map((menuItem, _index) => {
        return `<li class="menu-list-item d-flex items-center py-2" data-menu-id="${_index}">
                <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
                수정 </button>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
                삭제</button>
              </li>
              `;
      })
      .join("");

    $("#espresso-menu-list").innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    if ($("#espresso-menu-name").value.trim() == "") {
      alert("메뉴를 정확히 입력해주세요");
      return false;
    }

    const espressoMenuName = $("#espresso-menu-name").value.trim();
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);

    render();
    $("#espresso-menu-name").value = "";
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updateMenuName = prompt("수정말 메뉴명을 입력해주세요", $menuName.innerText);
    this.menu[menuId].name = updateMenuName;
    store.setLocalStorage(this.menu);

    $menuName.innerText = updateMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu);
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return false;
    }
    if (e.key === "Enter") {
      addMenuName();
    }
  });

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });
}

// App();

const app = new App();
app.init();
