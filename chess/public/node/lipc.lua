require("liblipclua")

-- source: https://wiki.mobileread.com/wiki/Kindle_Touch_Hacking#LIPC

local lipc_handle, error_message, error_number = lipc.init("com.ngxson.chess")
if not lipc_handle then
  print("Failed to initialize LIPC: (" .. tostring(error_number) .. ") " .. error_message)
  os.exit(error_number)
else
  lipc.set_error_handler(function(error) print(error) end)
end

local property = lipc_handle:register_string_property("sendToNode", "rw")
property.value = ""
property.listener = function (name, value)
  io.write(value)
  io.flush()
end

-- run event loop with timeout of Infinity seconds
while true do lipc.run_event_loop(math.huge) end