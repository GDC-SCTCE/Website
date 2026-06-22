export function validateUserData(data: {
  fullName: string;
  phone: string;
  rollNo: string;
  selectedTools?: string[];
}): string | null {
  const trimmedFullName = data.fullName.trim();
  const trimmedPhone = data.phone.trim();
  const trimmedRollNo = data.rollNo.trim();

  if (!trimmedFullName || !trimmedPhone || !trimmedRollNo) {
    return "Please fill all required fields.";
  }

  // Phone Number Validation (10-digit number with optional country code/spacers)
  const phoneRegex = /^(\+?\d{1,4}[- ]?)?\d{10}$/;
  if (!phoneRegex.test(trimmedPhone)) {
    return "Please enter a valid 10-digit phone number";
  }

  // Development Tools Validation (only if passed)
  if (data.selectedTools && data.selectedTools.length === 0) {
    return "Please select at least one development tool.";
  }

  return null;
}
