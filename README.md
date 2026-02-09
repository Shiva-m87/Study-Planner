# 📚 Smart Study Planner

A modern, feature-rich study planner web application with a sleek dark UI design. Track your subjects, manage tasks, schedule study sessions, and monitor your academic progress with real-time analytics.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

 
LIVE Link:https://study-planner-ruddy.vercel.app/

## ✨ Features

### 📊 Dashboard
- **Quick Stats Overview**: View total subjects, pending tasks, and completion percentage at a glance
- **Upcoming Deadlines**: Track the next 3 upcoming deadlines to stay on top of your work
- **Real-time Metrics**: Automatically updated statistics as you progress

### 📖 Subject Management
- Add unlimited subjects with priority levels (High, Medium, Low)
- Easy subject deletion with automatic cleanup of related tasks
- Color-coded priority system for better organization

### ✅ Task Management
- Create tasks with titles, deadlines, and subject associations
- Mark tasks as completed with visual strikethrough
- **Smart Filtering**: Filter tasks by status (All, Pending, Completed)
- **Search Functionality**: Quickly find tasks with real-time search
- **Overdue Detection**: Automatically highlights overdue tasks with visual indicators
- Task deletion with confirmation

### 📅 Weekly Schedule
- Plan your study sessions across the week (Monday-Friday)
- Set specific time slots for each subject
- **Conflict Detection**: Prevents overlapping time slots
- Visual weekly overview with total hours calculation
- Easy schedule modification and deletion

### 📈 Progress Analytics
- **Overall Completion**: Visual progress bar showing task completion rate
- **Subject Performance**: Individual progress tracking for each subject
- **Study Hours Tracking**: Weekly study time calculation
- **Overdue Counter**: Monitor tasks that need immediate attention
- **Most Productive Subject**: Identifies your best-performing subject
- **Productivity Score**: Calculated score (0-100) based on completion rate, study hours, and overdue tasks

### ⚙️ Settings
- **Dark/Light Mode Toggle**: Switch between dark and light themes with smooth transitions
- **Data Export**: Export all your data as JSON for backup
- **Data Reset**: Clear all data with confirmation dialog
- **Local Storage**: All data persists in your browser

## 🎨 Design Highlights

- **Modern Dark UI**: Sleek slate-based color scheme with vibrant cyan-to-purple gradients
- **Smooth Animations**: 
  - Shimmer effects on progress bars
  - Slide-in transitions for sections
  - Pulse animations for overdue items
  - Button shine effects
- **Responsive Design**: Fully mobile-friendly layout
- **Custom Scrollbar**: Styled gradient scrollbar
- **Interactive Elements**: Hover effects, transitions, and visual feedback
- **Grid Layout**: Modern CSS Grid for optimal spacing and alignment

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smart-study-planner.git
```

2. Navigate to the project directory:
```bash
cd smart-study-planner
```

3. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

That's it! No build process or dependencies required.

## 📁 Project Structure

```
smart-study-planner/
│
├── index.html          # Main HTML structure
├── style.css           # Complete styling and animations
├── script.js           # Application logic and data management
└── README.md           # Project documentation
```

## 💾 Data Storage

All data is stored locally in your browser using `localStorage`. This means:
- ✅ No server required
- ✅ Data persists between sessions
- ✅ Complete privacy (data never leaves your browser)
- ⚠️ Data is browser-specific (won't sync across devices)
- ⚠️ Clearing browser data will delete your planner data

**Tip**: Use the Export Data feature regularly to create backups!

## 🎯 Usage Guide

### Adding Your First Subject
1. Click "Subjects" in the navigation
2. Enter the subject name
3. Select priority level
4. Click "Add Subject"

### Creating Tasks
1. Navigate to "Tasks"
2. Enter task title
3. Select deadline date
4. Choose associated subject
5. Click "Add Task"

### Scheduling Study Time
1. Go to "Schedule"
2. Select day of the week
3. Set start and end times
4. Choose subject
5. Click "Add Slot"

### Tracking Progress
1. Visit "Analytics" to see:
   - Overall completion percentage
   - Individual subject performance
   - Weekly study hours
   - Productivity metrics

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `style.css`:
```css
/* Primary gradient colors */
background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);

/* Dark theme background */
background: #0f172a;
```

### Modifying the Productivity Score Formula
Edit the calculation in `script.js`:
```javascript
let score = 0;
score += completionPercent * 0.6;  // 60% weight on completion
score += Math.min(weeklyHours * 5, 30);  // Up to 30 points for study hours
score -= overdueTasks * 5;  // -5 points per overdue task
```

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

Requires a modern browser with ES6+ JavaScript support and localStorage API.

## 📱 Mobile Support

Fully responsive design works on:
- 📱 Smartphones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktops

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions
- Add pomodoro timer integration
- Implement study session tracking
- Add grade/GPA calculator
- Create data import functionality
- Add reminder notifications
- Implement cloud sync option
- Create more theme options

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by modern productivity apps
- Built with vanilla JavaScript for maximum performance
- Designed with student productivity in mind



⭐ If you find this project helpful, please give it a star!

## 🔮 Future Features

- [ ] Dark/Light theme auto-detection based on system preferences
- [ ] Calendar view for deadlines
- [ ] Study streak tracking
- [ ] Export to PDF/CSV
- [ ] Drag-and-drop task prioritization
- [ ] Study goal setting
- [ ] Break reminders
- [ ] Focus mode with minimal UI
- [ ] Statistics charts and graphs
- [ ] Multi-language support



