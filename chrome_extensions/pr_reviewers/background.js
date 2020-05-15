(function () {
  let REVIEWERS = [
    'kevinhyunilkim',
    'dianeliu21',
    // 'rhkwong',
    'zvmistry',
    'julieqdchen-gusto',
    'jimeister',
    // 'roger-mo-gusto',
  ];

  let addReviewersBtn;

  function addReviewer() {
    if (REVIEWERS.length > 0) {
      const reviewer = REVIEWERS.shift();

      document.getElementById('review-filter-field').value = reviewer;
      document.getElementById('review-filter-field').dispatchEvent(new Event('focus'));
      let waitCount = 0;

      const selectItem = function() {
        let menuItems = document.querySelectorAll('.filterable-active .select-menu-item');
        let reviewerMenuItem = null;
        menuItems.forEach(function(elem) {
          if (elem.textContent.indexOf(reviewer) !== -1) {
            reviewerMenuItem = elem;
          }
        });

        if (reviewerMenuItem) {
          reviewerMenuItem.click();
          setTimeout(addReviewer, 200);
        } else {
          if (waitCount > 8) {
            // console.log(`Skipping ${reviewer}. Couldn't find in reviewers tab`);
            setTimeout(addReviewer, 200);
          } else {
            waitCount++;
            setTimeout(selectItem, 500);
          }
        }
      }

      selectItem();
    } else {
      document.querySelectorAll('.sidebar-assignee.js-discussion-sidebar-item summary')[0].click()
      addReviewersBtn.parentNode.removeChild(addReviewersBtn);
    }
  }

  function startAddingReviewers() {
    const countMenuItems = function() {
      const menuItemCount = document.querySelectorAll('.select-menu-list .select-menu-item').length;

      if (document.querySelector('.js-discussion-sidebar-menu .select-menu-header').offsetParent == null) {
        document.querySelectorAll('.sidebar-assignee.js-discussion-sidebar-item summary')[0].click();
      }

      if (menuItemCount > 50) {
        addReviewer();
      } else {
        setTimeout(countMenuItems, 1000);
      }
    }

    setTimeout(countMenuItems, 1000);
    document.querySelectorAll('.sidebar-assignee.js-discussion-sidebar-item summary')[0].click();
  }

  function createButton() {
    const sidebarItem = document.createElement('DIV');
    addReviewersBtn = document.createElement('BUTTON');
    addReviewersBtn.id = 'pr_reviewers_ext_add_reviewers';
    addReviewersBtn.innerText = 'Add Reviewers';
    addReviewersBtn.classList.add('btn', 'btn-small', 'btn-block');

    sidebarItem.appendChild(addReviewersBtn);
    document.getElementById('partial-discussion-sidebar').prepend(sidebarItem);

    addReviewersBtn.addEventListener('click', startAddingReviewers);
  }

  function isThisMyPRQuestionMark() {
    let checkCount = 0;

    function checkForUser() {
      const signedInUser = document.querySelector('.user-profile-link .css-truncate-target');

      if (signedInUser) {
        const prAuthor = document.querySelector('#partial-discussion-header .author').textContent;

        if (signedInUser.textContent.trim() == prAuthor.trim()) {
          removeExistingReviewersFromList();

          if (REVIEWERS.length > 0) {
            createButton();
          }
        }
      } else {
        if (checkCount < 10) {
          checkCount++;
          setTimeout(checkForUser, 500);
        }
      }
    }
    checkForUser();
  }

  function removeExistingReviewersFromList() {
    const hasExistingReviewers = document.querySelector('.js-issue-sidebar-form').textContent.indexOf("Suggestions") == -1;

    if (!hasExistingReviewers) {
      const existingReviewers = [];
      document.querySelector('.js-issue-sidebar-form').
        querySelectorAll('.js-hovercard-left').
        forEach(function(el) { existingReviewers.push(el.textContent.trim()) });

      const remainingReviewers = [];

      REVIEWERS.forEach(function(reviewer) {
        if (existingReviewers.indexOf(reviewer) == -1) {
          remainingReviewers.push(reviewer);
        }
      });

      REVIEWERS = remainingReviewers;
    }
  }

  const onPRTitlePage = window.location.pathname.match("^/Gusto/zenpayroll/pull/[0-9]*\/?$");

  if (onPRTitlePage) {
    isThisMyPRQuestionMark();
  }
})();
