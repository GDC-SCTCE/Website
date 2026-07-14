import { useEffect } from "react";

export function useScreenshotDeterrent(setIsBlurred: (blurred: boolean) => void) {
  useEffect(() => {
    // 1. Handle PrintScreen keyup event
    const handleKeyUp = async (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        try {
          await navigator.clipboard.writeText("");
        } catch (err) {
          console.error("Failed to clear clipboard:", err);
        }
      }
    };

    // 2. Hide content when window loses focus (e.g. Snipping tool active)
    const handleBlur = () => {
      setIsBlurred(true);
    };

    // 3. Show content when user returns
    const handleFocus = () => {
      setIsBlurred(false);
    };

    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    // Initial check in case window is already out of focus on mount
    if (!document.hasFocus()) {
      setIsBlurred(true);
    }

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [setIsBlurred]);
}
