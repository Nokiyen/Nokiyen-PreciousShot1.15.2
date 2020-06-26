function initializeCoreMod() {

    var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
    var mappedMethodName1 = ASMAPI.mapMethod("func_228051_b_");

    return {
        'coremodmethod': {
            'target': {
                'type': 'METHOD',
                'class': 'net.minecraft.util.ScreenShotHelper',
//                'methodName': 'saveScreenshotRaw',
//                'methodName': 'func_228051_b_',
//                'methodName' : function(listOfMethods) {return ["saveScreenshotRaw", "func_228051_b_"];},
                'methodName': mappedMethodName1,
                'methodDesc': '(Ljava/io/File;Ljava/lang/String;IILnet/minecraft/client/shader/Framebuffer;Ljava/util/function/Consumer;)V'
            },
            'transformer': function(method) {
                print("enter transformer.");

                var Opcodes = Java.type('org.objectweb.asm.Opcodes');
                var InsnList = Java.type("org.objectweb.asm.tree.InsnList");
                var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");

                var arrayLength = method.instructions.size();
                var target_instruction;

                for (var i = 0; i < arrayLength; ++i) {
                    var instruction = method.instructions.get(i);

/*                    if (instruction.getOpcode() == Opcodes.INVOKEVIRTUAL) {
                        if (instruction.owner == "net/minecraftforge/client/event/ScreenshotEvent") {
                            if (instruction.name == "getCancelMessage") {
                                if (instruction.desc == "()Lnet/minecraft/util/text/ITextComponent") {
                                    target_instruction = instruction;
                                    print("Found injection point.");
                                    break;
                                }
                            }
                        }
                    }*/
                    if(instruction.name == "getCancelMessage") {
                        target_instruction = instruction;
                        print("Found injection point.");
                        break;
                    }
/*                    if (instruction.owner == "net/minecraftforge/client/event/ScreenshotEvent") {
                        if (instruction.desc == "()Lnet/minecraft/util/text/ITextComponent") {
                            target_instruction = instruction;
                            print("Found injection point.");
                            break;
                        }
                    }*/
                }

                var toInject = new InsnList();
                toInject.add(new InsnNode(Opcodes.POP));
                toInject.add(new InsnNode(Opcodes.RETURN));

                // Inject instructions
                method.instructions.insert(target_instruction, toInject);

                return method;
            }
        }
    }
}