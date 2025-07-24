use std::sync::Mutex;
use tauri::async_runtime::spawn;
use tauri::{AppHandle, Manager, State, Window};

// Create a struct we'll use to track the completion of
// setup related tasks
#[derive(Default, Debug)]
struct SetupState {
    frontend_task: bool,
    backend_task: bool,
}

// A custom task for setting the state of a setup task
#[tauri::command]
async fn set_complete(
    app: AppHandle,
    state: State<'_, Mutex<SetupState>>,
    task: String,
) -> Result<(), ()> {
    // Lock the state without write access
    let mut state_lock = state.lock().unwrap();
    match task.as_str() {
        "frontend" => state_lock.frontend_task = true,
        "backend" => state_lock.backend_task = true,
        _ => panic!("invalid task completed!"),
    }
    // Check if both tasks are completed
    if state_lock.backend_task && state_lock.frontend_task {
        // Setup is complete, we can close the splashscreen
        // and unhide the main window!
        let splash_window = app
            .get_webview_window("splashscreen")
            .expect("No window called 'splashscreen' found");
        let main_window = app
            .get_webview_window("main")
            .expect("No window called 'main' found");
        splash_window.close().unwrap();
        main_window.show().unwrap();
    }
    Ok(())
}

// An async function that does some heavy setup task
async fn setup(app: AppHandle) -> Result<(), ()> {
    // Fake performing some heavy action for 3 seconds
    println!("Performing really heavy backend setup task...");
    //NOTE: Add setup tasks here
    println!("Backend setup task completed!");

    // Set the backend task as being completed
    // Commands can be ran as regular functions as long as you take
    // care of the input arguments yourself
    set_complete(
        app.clone(),
        app.state::<Mutex<SetupState>>(),
        "backend".to_string(),
    )
    .await?;
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(SetupState::default()))
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            set_complete /*close_splashscreen*/
        ])
        .setup(|app| {
            spawn(setup(app.handle().clone()));
            // The hook expects an Ok result
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
