/**
 * step1. 요구사항 구현을 위한 전략
 * 메뉴 추가 / 수정 / 삭제  (CRUD)
 */

const $ = (selector) => document.querySelector(selector);

const addEspressoMenuName = () => {
  const espressoMenuName = $("#espresso-menu-name").value.trim();
  if (espressoMenuName == "") {
    alert("메뉴를 정확히 입력해주세요");
    return false;
  }
  const menuItemTemplate = (espressoMenuName) => {
    return `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
        <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
      type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
        </button>
    </li>
      `;
  };
  $("#espresso-menu-list").insertAdjacentHTML("beforeend", menuItemTemplate(espressoMenuName));
  const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
  $(".menu-count").innerText = `총 ${menuCount}개`;
  $("#espresso-menu-name").value = "";
};

function App() {
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addEspressoMenuName();
  });

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return false;
    }
    if (e.key === "Enter") {
      addEspressoMenuName();
    }
  });

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      const $menuName = e.target.closest("li").querySelector(".menu-name");
      const menuName = $menuName.innerText;
      const newName = prompt("수정말 메뉴명을 입력해주세요", menuName);
      $menuName.innerText = newName;
    }
  });
}

App();
