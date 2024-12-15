// src/components/ui/checkbox.js

// Checkboxというコンポーネントを作成
export const Checkbox = ({ label, ...props }) => {
    return (
    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="checkbox" {...props} />
        {label}
    </label>
    );
};
