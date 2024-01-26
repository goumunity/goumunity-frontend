export function formatBirthDate(value) {

    const birthDate = value

    const parts = [
        birthDate.slice(0, 4),
        birthDate.slice(4, 6),
        birthDate.slice(6),
      ];

      const formatted = parts.join('.');

    return formatted
}


