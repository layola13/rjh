interface CssModule {
  push(data: [string, string, string]): void;
}

const cssContent = `.dropdown-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 4px 0px;
}

.dropdown-item label {
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.dropdown-item .dropdown-content {
  display: none;
  margin-top: 2px;
}

.dropdown-item .dropdown-content p {
  white-space: pre-wrap;
}

.dropdown-arrow {
  display: inline-block;
  margin-left: 2px;
  margin-bottom: 1px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid black;
  transition: transform 0.3s ease-in-out;
}

.dropdown-content-active {
  display: block !important;
}

.dropdown-arrow-active {
  transform: rotate(-180deg) !important;
}`;

export default cssContent;