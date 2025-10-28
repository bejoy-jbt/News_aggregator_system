let sentimentChartInstance = null;
let sourceChartInstance = null;
let dailyChartInstance = null;

function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
    document.getElementById('fetchBtn').disabled = true;
    document.getElementById('btnText').innerHTML = '⏳ Processing...';
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
    document.getElementById('fetchBtn').disabled = false;
    document.getElementById('btnText').innerHTML = '🔄 Fetch & Analyze News';
}

async function fetchData() {
    showLoading();
    
    try {
        const response = await fetch("http://localhost:8000/api/fetch");
        const result = await response.json();
        
        // Show success message
        if (result.fetched > 0) {
            showNotification(`✅ Successfully fetched ${result.fetched} articles!`, 'success');
        } else {
            showNotification('⚠️ No articles fetched. Please check your API keys.', 'warning');
        }
        
        // Load all data
        await Promise.all([
            loadTopics(),
            loadSentiments(),
            loadSources(),
            loadPositiveTopics(),
            loadNegativeTopics(),
            loadDailySentiment()
        ]);
        
    } catch (error) {
        console.error('Error fetching data:', error);
        showNotification('❌ Failed to fetch articles. Make sure the backend is running.', 'error');
    } finally {
        hideLoading();
    }
}

function showNotification(message, type) {
    const colors = {
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500'
    };
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  async function loadTopics() {
    try {
    const res = await fetch("http://localhost:8000/api/topics");
    const data = await res.json();
    const list = document.getElementById("topics-list");
    list.innerHTML = "";
        
        if (data.topics && data.topics.length > 0) {
            data.topics.forEach((t, index) => {
      const li = document.createElement("li");
                li.className = "p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors";
                li.innerHTML = `
                    <div class="flex items-center justify-between">
                        <span class="font-semibold text-gray-800">${index + 1}. ${t._id}</span>
                        <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">${t.count}</span>
                    </div>
                `;
      list.appendChild(li);
    });
        } else {
            list.innerHTML = "<li class='text-gray-500 italic'>No topics yet. Fetch articles first!</li>";
        }
    } catch (error) {
        console.error('Error loading topics:', error);
        document.getElementById("topics-list").innerHTML = "<li class='text-red-500'>Error loading topics</li>";
    }
  }
  
  async function loadSentiments() {
    try {
        const res = await fetch("http://localhost:8000/api/sentiment");
    const data = await res.json();
        const ctx = document.getElementById("sentimentChart");
        
        if (sentimentChartInstance) {
            sentimentChartInstance.destroy();
        }
        
        if (data.sentiment && data.sentiment.length > 0) {
            const labels = data.sentiment.map(s => s.label);
            const counts = data.sentiment.map(s => s.count);
            
            sentimentChartInstance = new Chart(ctx, {
                type: "doughnut",
                data: { 
                    labels, 
                    datasets: [{ 
                        data: counts, 
                        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }] 
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error loading sentiments:', error);
    }
  }
  
  async function loadSources() {
    try {
        const res = await fetch("http://localhost:8000/api/sources");
    const data = await res.json();
        const ctx = document.getElementById("sourceChart");
        
        if (sourceChartInstance) {
            sourceChartInstance.destroy();
        }
        
        if (data.sources && data.sources.length > 0) {
    const labels = data.sources.map(s => s.source);
            const scores = data.sources.map(s => parseFloat(s.avg_score.toFixed(2)));
            const counts = data.sources.map(s => s.count || 0);
            
            // Color bars based on sentiment: green for positive, red for negative, gray for neutral
            const backgroundColors = scores.map(score => {
                if (score > 0.05) return '#10b981'; // positive - green
                if (score < -0.05) return '#ef4444'; // negative - red
                return '#6b7280'; // neutral - gray
            });
            
            const hoverColors = scores.map(score => {
                if (score > 0.05) return '#059669';
                if (score < -0.05) return '#dc2626';
                return '#4b5563';
            });
            
            sourceChartInstance = new Chart(ctx, {
      type: "bar",
                data: { 
                    labels, 
                    datasets: [{ 
                        label: 'Average Sentiment Score', 
                        data: scores,
                        count: counts,
                        backgroundColor: backgroundColors,
                        hoverBackgroundColor: hoverColors,
                        borderRadius: 8,
                        borderSkipped: false,
                        borderWidth: 2,
                        borderColor: '#fff'
                    }] 
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 1,
                            min: -1,
                            title: {
                                display: true,
                                text: 'Sentiment Score',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            grid: {
                                color: function(context) {
                                    if (context.tick.value === 0) return '#000000';
                                    return '#e5e7eb';
                                },
                                lineWidth: function(context) {
                                    if (context.tick.value === 0) return 2;
                                    return 1;
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'News Sources',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                maxRotation: 45,
                                minRotation: 45
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 13
                            },
                            callbacks: {
                                afterLabel: function(context) {
                                    const count = context.dataset.count[context.dataIndex];
                                    return `${count} articles`;
                                },
                                label: function(context) {
                                    const value = context.parsed.y;
                                    let sentiment = 'neutral';
                                    if (value > 0.05) sentiment = 'positive 😊';
                                    else if (value < -0.05) sentiment = 'negative 😞';
                                    return `Sentiment: ${sentiment}`;
                                },
                                footer: function(context) {
                                    const value = context[0].parsed.y;
                                    if (value > 0.3) return '📈 Strongly Positive';
                                    if (value > 0.05) return '📊 Moderately Positive';
                                    if (value > -0.05) return '📉 Neutral';
                                    if (value > -0.3) return '📊 Moderately Negative';
                                    return '📈 Strongly Negative';
                                }
                            }
                        },
                        onClick: function(event, elements) {
                            if (elements.length > 0) {
                                const index = elements[0].index;
                                const label = this.data.labels[index];
                                const score = this.data.datasets[0].data[index];
                                showNotification(
                                    `📰 ${label}: ${score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral'} sentiment`,
                                    'success'
                                );
                            }
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error loading sources:', error);
    }
}

// View All Articles function
async function viewAllArticles() {
    showLoading();
    
    try {
        const res = await fetch("http://localhost:8000/api/articles");
        const data = await res.json();
        
        const modal = document.getElementById('articlesModal');
        const container = document.getElementById('articlesContainer');
        container.innerHTML = '';
        
        if (data.articles && data.articles.length > 0) {
            data.articles.forEach((article, index) => {
                const sentiment = article.sentiment || {};
                const sentimentBadge = sentiment.label ? 
                    `<span class="px-3 py-1 rounded-full text-sm font-semibold ${
                        sentiment.label === 'positive' ? 'bg-green-100 text-green-700' :
                        sentiment.label === 'negative' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                    }">${sentiment.label}</span>` : '';
                
                const topicsHtml = article.topics && article.topics.length > 0 ? 
                    `<div class="flex flex-wrap gap-2 mt-2">
                        ${article.topics.slice(0, 5).map(topic => 
                            `<span class="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs">${topic}</span>`
                        ).join('')}
                    </div>` : '';
                
                const articleDiv = document.createElement('div');
                articleDiv.className = 'bg-gray-50 p-5 rounded-lg border border-gray-200 hover:shadow-md transition-shadow';
                articleDiv.innerHTML = `
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-start gap-3 mb-2">
                                <span class="text-gray-400 font-mono text-sm">#${index + 1}</span>
                                <h3 class="text-lg font-bold text-gray-800">${article.title || 'No title'}</h3>
                            </div>
                            <p class="text-gray-600 mb-2">${article.description || 'No description'}</p>
                            ${topicsHtml}
                        </div>
                        <div class="ml-4 flex flex-col items-end gap-2">
                            ${sentimentBadge}
                            <span class="text-xs text-gray-500">${new Date(article.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div class="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-sm">
                        <span class="text-gray-600">
                            <strong>Source:</strong> ${article.source || 'Unknown'}
                        </span>
                        ${article.url ? `<a href="${article.url}" target="_blank" class="text-blue-600 hover:text-blue-800 font-semibold">Read More →</a>` : ''}
                    </div>
                `;
                container.appendChild(articleDiv);
            });
            
            showNotification(`✅ Found ${data.count} articles`, 'success');
        } else {
            container.innerHTML = '<p class="text-center text-gray-500 text-lg">No articles found. Fetch some articles first!</p>';
        }
        
        modal.classList.remove('hidden');
    } catch (error) {
        console.error('Error loading articles:', error);
        showNotification('❌ Failed to load articles', 'error');
    } finally {
        hideLoading();
    }
}

function closeModal() {
    document.getElementById('articlesModal').classList.add('hidden');
}

async function loadPositiveTopics() {
    try {
        const res = await fetch("http://localhost:8000/api/insights/positive-topics");
        const data = await res.json();
        const list = document.getElementById("positive-topics");
        list.innerHTML = "";
        
        if (data.topics && data.topics.length > 0) {
            data.topics.slice(0, 5).forEach((t, index) => {
                const li = document.createElement("li");
                li.className = "p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors";
                li.innerHTML = `
                    <div class="flex items-center justify-between">
                        <span class="font-semibold text-gray-800">${index + 1}. ${t._id}</span>
                        <span class="px-3 py-1 bg-green-200 text-green-700 rounded-full text-sm font-bold">${t.count}</span>
                    </div>
                `;
                list.appendChild(li);
            });
        } else {
            list.innerHTML = "<li class='text-gray-500 italic'>No positive topics found</li>";
        }
    } catch (error) {
        console.error('Error loading positive topics:', error);
        document.getElementById("positive-topics").innerHTML = "<li class='text-red-500'>Error loading</li>";
    }
}

async function loadNegativeTopics() {
    try {
        const res = await fetch("http://localhost:8000/api/insights/negative-topics");
        const data = await res.json();
        const list = document.getElementById("negative-topics");
        list.innerHTML = "";
        
        if (data.topics && data.topics.length > 0) {
            data.topics.slice(0, 5).forEach((t, index) => {
                const li = document.createElement("li");
                li.className = "p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors";
                li.innerHTML = `
                    <div class="flex items-center justify-between">
                        <span class="font-semibold text-gray-800">${index + 1}. ${t._id}</span>
                        <span class="px-3 py-1 bg-red-200 text-red-700 rounded-full text-sm font-bold">${t.count}</span>
                    </div>
                `;
                list.appendChild(li);
            });
        } else {
            list.innerHTML = "<li class='text-gray-500 italic'>No negative topics found</li>";
        }
    } catch (error) {
        console.error('Error loading negative topics:', error);
        document.getElementById("negative-topics").innerHTML = "<li class='text-red-500'>Error loading</li>";
    }
}

async function loadDailySentiment() {
    try {
        // Call the endpoint that fetches AND returns today's sentiment
        const res = await fetch("http://localhost:8000/api/fetch/today");
        const data = await res.json();
        const ctx = document.getElementById("dailyChart");
        
        console.log('Daily sentiment data:', data);
        
        if (dailyChartInstance) {
            dailyChartInstance.destroy();
        }
        
        // Use distribution from the new endpoint
        const distribution = data.distribution || [];
        
        if (distribution && distribution.length > 0) {
            console.log('Raw distribution data:', distribution);
            
            // Sort by date to ensure proper ordering
            const sorted = [...distribution].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB;
            });
            
            console.log('Sorted data:', sorted);
            
            const dates = sorted.map(d => {
                try {
                    const date = new Date(d.date + 'T00:00:00');
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                } catch (e) {
                    return d.date; // Fallback to original date string
                }
            });
            
            const positive = sorted.map(d => {
                const val = parseInt(d.positive) || 0;
                console.log(`Positive for ${d.date}: ${val}`);
                return val;
            });
            const negative = sorted.map(d => parseInt(d.negative) || 0);
            const neutral = sorted.map(d => parseInt(d.neutral) || 0);
            
            console.log('Chart data:', { 
                dateLabels: dates, 
                positiveData: positive, 
                negativeData: negative, 
                neutralData: neutral,
                totalDataPoints: dates.length
            });
            
            dailyChartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Positive',
                            data: positive,
                            backgroundColor: '#10b981',
                            borderColor: '#059669',
                            borderWidth: 2,
                            borderRadius: 4
                        },
                        {
                            label: 'Neutral',
                            data: neutral,
                            backgroundColor: '#6b7280',
                            borderColor: '#4b5563',
                            borderWidth: 2,
                            borderRadius: 4
                        },
                        {
                            label: 'Negative',
                            data: negative,
                            backgroundColor: '#ef4444',
                            borderColor: '#dc2626',
                            borderWidth: 2,
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    layout: {
                        padding: {
                            top: 10,
                            right: 20,
                            left: 10,
                            bottom: 10
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            stacked: false,
                            title: {
                                display: true,
                                text: 'Number of Articles',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            grid: {
                                color: '#e5e7eb',
                                drawBorder: false
                            },
                            ticks: {
                                precision: 0
                            }
                        },
                        x: {
                            stacked: false,
                            title: {
                                display: true,
                                text: 'Date',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 15,
                                font: {
                                    size: 12,
                                    weight: 'bold'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleFont: {
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                size: 13
                            },
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.y + ' articles';
                                }
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutCubic'
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error loading daily sentiment:', error);
    }
}

// Load data on page load
window.addEventListener('DOMContentLoaded', () => {
    loadTopics();
    loadSentiments();
    loadSources();
    loadPositiveTopics();
    loadNegativeTopics();
    loadDailySentiment();
});
  