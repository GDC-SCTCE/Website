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

  // Phone Number Validation (strictly 10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(trimmedPhone)) {
    return "Please enter a valid 10-digit phone number";
  }

  const rollNoRegex = /^[A-Za-z0-9]{3}\d{2}[A-Za-z0-9]{2}\d{3}$/;
  if (!rollNoRegex.test(trimmedRollNo)) {
    return "Enter University Roll No";
  }

  // Development Tools Validation (only if passed)
  if (data.selectedTools && data.selectedTools.length === 0) {
    return "Please select at least one development tool.";
  }

  return null;
}
