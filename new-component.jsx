"use client";
import React from "react";

function NewComponent({ text, textColor, fontWeight }) {
  return (
    <span className={`font-${fontWeight} text-[${textColor}]`}>{text}</span>
  );
}

function NewComponentStory() {
  return (
    <div className="space-y-4">
      <NewComponent text="until claim" textColor="#1a1a1a" fontWeight="bold" />
    </div>
  );
}

export default NewComponent;