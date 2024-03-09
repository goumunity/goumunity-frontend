const SAVING_CATEGORY_OPTIONS = [
  {id: 1, value: 'FOOD', userText: '식비'},
  {id: 2, value: 'HOUSING', userText: '주거비'},
  {id: 3, value: 'TRANSPORTATION_COMMUNICATION', userText: '교통·통신비'},
  {id: 4, value: 'ENTERTAINMENT', userText: '문화생활비'},
  {id: 5, value: 'ETC', userText: '기타'},
]

function SavingCategorySelectBox({ widthSize, color, defaultValue, title='관심소비내역', ...props }) {
  return (
    <select
      className={`px-2 py-1 bg-${color} rounded-md border-solid border-2 border-black font-daeam text-lg w-${widthSize}`}
      // defaultValue={defaultValue}
      {...props}
    >
      <option value='none'>{title}</option>
      {SAVING_CATEGORY_OPTIONS.map((savingCategory) => {
        return (
          <option key={savingCategory.id} value={savingCategory.value} selected={defaultValue === savingCategory.value}>
            {savingCategory.userText}
          </option>
        );
      })}
    </select>
  );
}

export default SavingCategorySelectBox;
