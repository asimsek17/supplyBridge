module.exports = {
  RESPONSE_CODES: {
    UNKNOWN: {
      CODE: "UNKNOWN",
      MESSAGE: "Beklenmeyen bir hata oluştu.",
    },
    COMPONENT_NOT_FOUND: {
      CODE: "COMPONENT_NOT_FOUND",
      MESSAGE: "Component bulunamadı.",
    },
    COMPONENT_EXISTS: {
      CODE: "COMPONENT_EXISTS",
      MESSAGE: "Bu component mevcut.",
    },
    VEHICLE_MODEL_NOT_FOUND: {
      CODE: "VEHICLE_MODEL_NOT_FOUND",
      MESSAGE: "Vehicle bulunamadı.",
    },
    VEHICLE_MODEL_EXISTS: {
      CODE: "VEHICLE_MODEL_EXISTS",
      MESSAGE: "Bu vehicle mevcut.",
    },
    SUPPLIER_NOT_FOUND: {
      CODE: "SUPPLIER_NOT_FOUND",
      MESSAGE: "Supplier bulunamadı.",
    },
    SUPPLIER_EXISTS: {
      CODE: "SUPPLIER_EXISTS",
      MESSAGE: "Bu supplier mevcut.",
    },
    OEM_NOT_FOUND: {
      CODE: "OEM_NOT_FOUND",
      MESSAGE: "OEM bulunamadı.",
    },
    OEM_EXISTS: {
      CODE: "OEM_EXISTS",
      MESSAGE: "Bu oem mevcut.",
    },
    USER_EXISTS: { CODE: "USER_EXISTS", MESSAGE: "User already exists" },
    USER_NOT_FOUND: { CODE: "USER_NOT_FOUND", MESSAGE: "User not found" },
    UNAUTHORIZED: {
      CODE: "UNAUTHORIZED",
      MESSAGE: "Lütfen giriş yapınız.",
    },
    INVALID_CREDENTIALS: {
      CODE: "INVALID_CREDENTIALS",
      MESSAGE: "Invalid email or password",
    },
  },
};
