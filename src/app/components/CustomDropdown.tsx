"use client";

import { useState, useRef, useEffect, KeyboardEvent, useId } from "react";
import styles from "./CustomDropdown.module.css";

type Option = {
  value: string;
  label: string;
};

type CustomDropdownProps = {
  id?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  width?: string | number;
};

const CustomDropdown = ({ id, options, value, onChange, width }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [direction, setDirection] = useState<"top" | "bottom">("bottom");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const selectedOption = options.find((option) => option.value === value);

  const handleToggle = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  const closeMenu = () => {
    controlRef.current?.focus(); // Move focus immediately
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setFocusedIndex(-1);
    }, 200); // Corresponds to animation duration
  };

  const handleOptionClick = (newValue: string) => {
    onChange(newValue);
    closeMenu();
  };

  useEffect(() => {
    if (!isOpen) return;

    const calculateDirection = () => {
      if (!dropdownRef.current) return;

      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - dropdownRect.bottom;
      const spaceAbove = dropdownRect.top;

      // Roughly estimate menu height - 200px is the max-height in CSS
      const menuHeight = Math.min(options.length * 40 + 10, 200);

      if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
        setDirection("top");
      } else {
        setDirection("bottom");
      }
    };

    calculateDirection();
    const selectedIndex = options.findIndex((opt) => opt.value === value);
    setFocusedIndex(selectedIndex);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, options, options.length, value]);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        if (isOpen) {
          e.preventDefault();
          closeMenu();
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        setFocusedIndex((prevIndex) => (prevIndex < options.length - 1 ? prevIndex + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : options.length - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen) {
          if (focusedIndex !== -1) {
            handleOptionClick(options[focusedIndex].value);
          }
        } else {
          setIsOpen(true);
        }
        break;
      case "Tab":
        if (isOpen) {
          closeMenu();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen && focusedIndex !== -1) {
      const optionElement = dropdownRef.current?.querySelector<HTMLLIElement>(
        `[data-index="${focusedIndex}"]`
      );
      optionElement?.scrollIntoView({ block: "nearest" });
    }
  }, [isOpen, focusedIndex]);

  return (
    <div className={styles.dropdown} ref={dropdownRef} onKeyDown={handleKeyDown} style={{ width }}>
      <button
        type="button"
        ref={controlRef}
        className={styles.control}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        id={id}>
        <span>{selectedOption ? selectedOption.label : "Select..."}</span>
        <span
          className={`${styles.chevron} ${isOpen ? (direction === "top" ? styles.openTop : styles.open) : ""}`}
        />
      </button>
      {(isOpen || isClosing) && (
        <ul
          className={`${styles.menu} ${isClosing ? styles.closing : ""} ${direction === "top" ? styles.top : ""}`}
          role="listbox"
          id={menuId}
          aria-labelledby={id}
          onMouseLeave={() => setFocusedIndex(-1)}>
          {options.map((option, index) => (
            <li
              key={option.value}
              data-index={index}
              className={`${styles.option} ${focusedIndex === index ? styles.focused : ""}`}
              onClick={() => handleOptionClick(option.value)}
              onMouseEnter={() => setFocusedIndex(index)}
              role="option"
              aria-selected={value === option.value}
              tabIndex={-1}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
